let pData = require("../build/contracts/Project.json")


/**
 * Get the project instance at given address using the extension
 *
 * @param address - address of project contract
 * @param extension - an instantiated harmony extension
 * @returns {null|Contract}
 */
function getProjectInstance(address, extension) {
    if (extension == null) {
        console.error("Could not load wallet extension...")
        return null
    }
    console.log("Project Contract Address: " + address)
    return extension.contracts.createContract(pData.abi,address)
}

export {getProjectInstance}