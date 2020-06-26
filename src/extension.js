const {HarmonyExtension} = require('@harmony-js/core')
const {endpoint, chainID, shardID} = require("../config")

// TODO: hardcode mainnet endpoint and chainID if needed...

console.log("It works")

if (window.harmony) {
    const ext = new HarmonyExtension(window.harmony,
        {
            chainId: chainID,
            shardID: shardID,
            chainUrl: endpoint
        },
    )
} else {
    console.error("Could not load harmony extension")
    const ext = null
}

// Extension still needs to be logged in
export default ext
