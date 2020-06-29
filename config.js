// THIS IS FOR DEPLOY USE ONLY!!!
require('dotenv').config()

let endpoint, chainID, shardID
switch (process.env.NETWORK) {
    case 'localnet': {
        endpoint = "http://localhost:950" + process.env.SHARD + "/"
        chainID = 2
        shardID = process.env.SHARD
        break;
    }
    case 'testnet': {
        endpoint = "https://api.s" + process.env.SHARD + ".b.hmny.io"
        chainID = 2
        shardID = process.env.SHARD
        break;
    }
    case 'mainnet': {
        endpoint = "https://api.s" + process.env.SHARD + ".t.hmny.io"
        chainID = 1
        shardID = process.env.SHARD
        break;
    }
}

module.exports = {
    endpoint,
    chainID,
    shardID,
}