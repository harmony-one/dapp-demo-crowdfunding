const Crowdfunding = artifacts.require("Crowdfunding");
const fs = require('fs');

module.exports = function(deployer) {
  deployer.deploy(Crowdfunding).then(() => {
    let deployData = {
      'contract_address': Crowdfunding.address,
    }
    let deployDir = __dirname + "/../deploy/contracts/"
    if (!fs.existsSync(deployDir)){
      fs.mkdirSync(deployDir, {recursive: true})
    }
    fs.writeFileSync(deployDir + "Crowdfunding.json", JSON.stringify(deployData))
  })
};