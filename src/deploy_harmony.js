require('dotenv').config()
const {Harmony} = require('@harmony-js/core')
const {ChainType} = require('@harmony-js/utils')
const {endpoint, chainID} = require("../config")

function createHmy() {
    let hmy = new Harmony(endpoint,
        {
            chainType: ChainType.Harmony,
            chainId: chainID,
        },
    )
    const deployer = hmy.wallet.addByMnemonic(process.env.MNEMONIC)
    hmy.wallet.setSigner(deployer.address)
    return hmy
}

async function setSharding(hmy) {
    const res = await hmy.blockchain.getShardingStructure();
    hmy.shardingStructures(res.result);
}

/**
 * Initialize the harmony instance with the given environment
 *
 * @returns {Promise<Harmony>}
 */
module.exports = async function () {
    const hmy = createHmy()
    await setSharding(hmy)
    return hmy
}
