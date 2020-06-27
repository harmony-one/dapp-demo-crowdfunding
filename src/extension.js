const {HarmonyExtension} = require('@harmony-js/core')
const {ChainType} = require('@harmony-js/utils')
const {Messenger, Provider} = require('@harmony-js/network')

/**
 * Get the harmony extension and set correct messenger for the given chain info
 *
 * @param endpoint - endpoint of the chain you are talking to
 * @param shard - the shard of the chain you are talking to
 * @param chaindID - the chainID of the chain you are talking to
 * @returns {HarmonyExtension}
 */
module.exports = function getExtension(endpoint, shard, chaindID) {
    let ext
    if (window.harmony) {
        ext = new HarmonyExtension(window.harmony)
        // Hack because mathwallet instantiation is not good.
        // WARNING: order matters
        ext.provider = new Provider(endpoint).provider
        ext.messenger = new Messenger(ext.provider, ChainType.Harmony, chaindID)
        ext.setShardID(shard)
        ext.wallet.messenger = ext.messenger
        ext.blockchain.messenger = ext.messenger
        ext.transactions.messenger = ext.messenger
        ext.contracts.wallet = ext.wallet
    } else {
        console.error("Could not load harmony extension")
    }
    return ext
}
