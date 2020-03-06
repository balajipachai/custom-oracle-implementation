/* eslint-disable no-console */
const Web3 = require('web3');
const contract = require('truffle-contract');
const axios = require('axios');
const config = require('../truffle');
const helloWorldJson = require('../build/contracts/HelloWorld.json');

const web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.PROTOCOL}://${process.env.HOST}:${process.env.RPC_PORT}`));

const web3Socket = new Web3(new Web3.providers.WebsocketProvider(`${process.env.WEBSOCKET_PROTOCOL}://${process.env.HOST}:${process.env.WEBSOCKET_PORT}`));

const getEthAccounts = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    return accounts;
  } catch (e) {
    console.log('error in utils/index/getEthAccounts: ', e);
    e.type = e.name;
    e.fromFunction = 'getEthAccounts';
    return (e);
  }
};

/**
 * Function that gets the web3 instance
 */
const getWeb3 = () => web3;

/**
 * Function that gets the web3Socket instance
 */
const getWeb3Socket = () => web3Socket;

/**
 * Function that returns a contract instance from the contracts json description
 * */
const getContractFromJSON = (contractJSON) => contract(contractJSON);

/**
 * Function that returns the network id
 * @param {string} environment Enviroment name
 */
const getNetworkId = (environment) => config.networks[environment].network_id;

/**
 * Function that gets the contract instance
 * @param {ContractObject} contractIns The contract object
 */
const getContractInstance = (contractIns, isSocketInstance) => {
  if (isSocketInstance) {
    console.log('inside isSocketTrue');
    return new web3Socket.eth.Contract(contractIns.abi, contractIns.address);
  }
  return new web3.eth.Contract(contractIns.abi, contractIns.address);
};

/**
 * Function that does the initial setup
 * @param {ContractObject} contractInstance The contract object
 * @param {string} environment The current development environment
 */
const initialSetup = (contractInstance, isSocketInstance = false, environment = 'development') => {
  contractInstance.setNetwork(getNetworkId(environment));
  return getContractInstance(contractInstance, isSocketInstance);
};

/**
 * Function that sets the watch on the events
 * @param {Object} params Object containing the contractInstance and eventName
 */
const setWatchOnEvents = async (params) => {
  try {
    const filterOptions = {
      fromBlock: '0',
      toBlock: 'latest',
    };
    await params.contractInstance.events[params.eventName](filterOptions, async (err, event) => {
      console.log('Event values: *************************\n', err, event.returnValues);
      const response = await axios.get(process.env.DATA_URL);
      const { results } = response.data;
      const index = Math.floor(Math.random() * 10);
      const { name } = results[index];
      const timestamp = Date.now();
      // Call the Contract's changeName function
      const HelloWorldContract = getContractFromJSON(helloWorldJson);
      const contractInstance = initialSetup(HelloWorldContract);
      const receipt = await contractInstance.methods.changeName(
        name,
        timestamp,
      ).send({ from: process.env.OWNER });
      // Return the receipt
      console.log('Receipt details are: ', receipt);
      return receipt;
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getEthAccounts,
  getWeb3,
  getWeb3Socket,
  getContractFromJSON,
  initialSetup,
  setWatchOnEvents,
};
