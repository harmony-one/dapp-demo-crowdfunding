let cfData = require("../build/contracts/Crowdfunding.json")
let cfDeploy = require("../deploy/contracts/Crowdfunding.json")


/**
 * Get the crowdfunding instance using the extension
 *
 * @param extension - an instantiated harmony extension
 * @returns {null|Contract}
 */
function getCrowdfundingInstance(extension) {
    if (extension == null) {
        console.error("Could not load wallet extension...")
        return null
    }
    console.log("Crowdfunding Contract Address: " + cfDeploy.contract_address)
    return extension.contracts.createContract(cfData.abi, cfDeploy.contract_address)
}

export {getCrowdfundingInstance}