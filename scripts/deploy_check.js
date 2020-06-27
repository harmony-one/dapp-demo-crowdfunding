'use strict';
require('dotenv').config()
const assert = require("assert")
let initHmy = require('../src/deploy_harmony')
let cfData = require(__dirname + "/../build/contracts/Crowdfunding.json")
let pData = require(__dirname + "/../build/contracts/Project.json")
let cfDeploy = require(__dirname + "/../deploy/contracts/Crowdfunding.json")


/**
 * Check the given Crowdfunding for basic functions:
 *     - List Projects
 *     - Create Projects
 *     - Check if new list of Projects is updated
 *
 * @param contract - a Crowdfunding contract.
 * @param hmy - initialized harmony instance for the correct chain.
 */
function checkCrowdfundingContract(hmy, contract) {
    let methods = contract.methods
    assert('returnAllProjects' in methods)
    assert('startProject' in methods)

    let testTitle = "Deploy Test Project"
    let testDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sapien velit, dapibus et tempor ut, consectetur convallis augue. Vestibulum id elementum nibh. Suspendisse potenti. Mauris in mi in sapien bibendum tincidunt. Aliquam erat volutpat. Maecenas sed dictum turpis. Morbi tristique elit nec est ullamcorper lobortis. Maecenas in varius orci. Suspendisse bibendum neque ac nisi semper, in bibendum massa vehicula. Sed non nisi ut tellus porta mollis et nec lorem."
    let testDuration = 1
    let testAmount = new hmy.utils.Unit(1000).asEther().toWei()
    let fromAccount = hmy.wallet.accounts[0]
    let gasPrice = new hmy.utils.Unit(process.env.GASPRICE).asWei().toWei()
    let gasLimit = process.env.GASLIMIT

    contract.methods.returnAllProjects().call().then((projects) => {
        console.log("List of current projects: " + projects)
        console.log("=== DEPLOYING TEST PROJECT CONTRACT ===")
        methods.startProject(
            testTitle,
            testDescription,
            testDuration,
            testAmount
        ).send({
            from: fromAccount,
            gasPrice: gasPrice,
            gasLimit: gasLimit
        }).then((res) => {
            let newProjectAddress = res.address
            assert(newProjectAddress != null)
            console.log("test project address: " + newProjectAddress)
            const projectContract = hmy.contracts.createContract(pData.abi, newProjectAddress)
            console.log(projectContract)
            let projectMethods = projectContract.methods
            assert('contribute' in projectMethods)
            assert('checkIfFundingCompleteOrExpired' in projectMethods)
            assert('getRefund' in projectMethods)
            assert('getDetails' in projectMethods)
            console.log("=== SUCCESSFUL DEPLOY CHECK ===")
            process.exit(0)
        })
    })
}

/**
 * Do a basic sanity check on the contract, given the deployed address and built ABI.
 *
 * @param hmy - initialized harmony instance for the correct chain.
 */
function check(hmy) {
    const contract = hmy.contracts.createContract(cfData.abi, cfDeploy.contract_address)
    console.log(contract)
    if (contract == null) {
        console.log("=== CONTRACT FAILED TO DEPLOY ===")
        exit(1)
    }
    console.log("=== CONTRACT DEPLOYED CORRECTLY ===")
    checkCrowdfundingContract(hmy, contract)
}

initHmy().then((hmy) => {
    assert(hmy.wallet.accounts.length > 0)
    check(hmy)
})