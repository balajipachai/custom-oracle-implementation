const utils = require('../../utils/');
const helloWorldJson = require('../../build/contracts/HelloWorld.json');

const HelloWorldContract = utils.getContractFromJSON(helloWorldJson);

const callChangeMessage = async (params) => {
  try {
    const contractInstance = utils.initialSetup(HelloWorldContract);
    const { message } = params;
    const timestamp = Date.now();
    await utils.unlockAccount(process.env.OWNER);
    const receipt = await contractInstance.methods.changeMessage(
      message,
      timestamp,
    ).send({ from: process.env.OWNER });
    return receipt;
  } catch (e) {
    throw new Error(e);
  }
};

const getCurrentMessage = async () => {
  try {
    const contractInstance = utils.initialSetup(HelloWorldContract);
    const message = await contractInstance.methods.message().call();
    return message;
  } catch (e) {
    throw new Error(e);
  }
};

const getGreetedHelloTo = async () => {
  try {
    const contractInstance = utils.initialSetup(HelloWorldContract);
    const message = await contractInstance.methods.greetedHelloTo().call();
    return message;
  } catch (e) {
    throw new Error(e);
  }
};

const getContractOwner = async () => {
  try {
    const contractInstance = utils.initialSetup(HelloWorldContract);
    const message = await contractInstance.methods.owner().call();
    return message;
  } catch (e) {
    throw new Error(e);
  }
};

const getAllEvents = async () => {
  try {
    const filterOptions = {
      fromBlock: '0',
      toBlock: 'latest',
    };
    const eventDetails = [];
    const isSocketInstance = true;
    const contractInstance = utils.initialSetup(HelloWorldContract, isSocketInstance);
    await contractInstance.getPastEvents('LogMessageChanged', filterOptions, async (err, events) => {
      events.forEach((event) => {
        eventDetails.push({
          event: event.event,
          blockHash: event.blockHash,
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
          oldValue: event.returnValues.oldMessage,
          newValue: event.returnValues.newMessage,
          timestamp: new Date(Number.parseInt(event.returnValues.timestamp, 10)).toLocaleString(),
        });
      });
    });

    await contractInstance.getPastEvents('LogNameChanged', filterOptions, async (err, events) => {
      events.forEach((event) => {
        eventDetails.push({
          event: event.event,
          blockHash: event.blockHash,
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
          oldValue: event.returnValues.oldName,
          newValue: event.returnValues.newName,
          timestamp: new Date(Number.parseInt(event.returnValues.timestamp, 10)).toLocaleString(),
        });
      });
    });
    return eventDetails;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  callChangeMessage,
  getCurrentMessage,
  getGreetedHelloTo,
  getContractOwner,
  getAllEvents,
};
