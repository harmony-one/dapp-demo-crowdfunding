# Crowdfunding dapp example

## Video Demo:

[![Demo](http://img.youtube.com/vi/YWd3_6voM90/0.jpg)](https://www.youtube.com/watch?v=YWd3_6voM90 "Demo")

## Run the crowdfunding dApp from scratch 
**Be in the root of this repo**
1) Install Truffle:
```bash
npm install -g truffle
```
2) Install dependencies:
```bash
npm install
```
3) Setup deploy environment:
```bash
bash ./scripts/setup.sh
```
4) Truffle compile:
```bash
truffle compile
```
5) Deploy:
```bash
bash ./scripts/deploy.sh
```
6) Start Local server:
```bash
npm run serve
```
7) Profit.

## Exploration
**Curious on how the deployment works? Here is the high level:**
* We use [truffle](https://www.trufflesuite.com/docs/truffle/overview) to develop and iterate on our smart contract(s).
* We set the contract deployment information in a `.env` file using the `./scripts/setup.sh` script.
* The environment variables are used in `config.js` and `truffle-config.js` for deployment of contracts (user facing code will **not** see or use the environment variable)
* The contract deployment generates build and deploy files that are needed for the dapp to interface with.
* On contract deployment, a script is ran (`./scripts/deploy_check.js`) to conduct a sanity check and start a test project. 
* Once the contracts are deployed, `npm run serve` will build our dapp with the correct configs to talk to our contracts.  

**Curious on how a user can interface with a dapp running on harmony? Here is a high level:**
* In this project, we use the Harmony extension found in the JS SDK ([mathwallet](https://www.mathwallet.org/harmony-wallet/en/)).
* Code to fetch an instance of the 2 smart contracts used by this project can be found in `./contracts/project.js` & `./contracts/crowdfunding.js`.
* Code to instantiate a harmony extension object (for signing transactions and talking to smart contracts) can be found in `./src/extension.js`
* Functions for loading crowdfunding projects (fetching project info from contract) can be found in `./src/App.vue`
* Functions for creating a project (creating a project contract using the user's wallet) can be found in `./src/components/NewProjectForm.vue`
* Functions for funding a crowdfunding project can be found in `./src/components/ProjectCard.vue`  

## Extra
Some more information on smart contract development can be found [here](https://docs.harmony.one/home/developers/smart-contracts).
