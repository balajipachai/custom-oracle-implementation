const helloWorld = require('./helloWorld/');

const helloWorldChangeMessage = async (params) => {
  try {
    const result = await helloWorld.callChangeMessage(params);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const helloWorldGetCurrentMessage = async () => {
  try {
    const result = await helloWorld.getCurrentMessage();
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const helloWorldGetGreetedHelloTo = async () => {
  try {
    const result = await helloWorld.getGreetedHelloTo();
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const helloWorldGetContractOwner = async () => {
  try {
    const result = await helloWorld.getContractOwner();
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const helloWorldGetAllEvents = async () => {
  try {
    const result = await helloWorld.getAllEvents();
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  helloWorldChangeMessage,
  helloWorldGetCurrentMessage,
  helloWorldGetGreetedHelloTo,
  helloWorldGetContractOwner,
  helloWorldGetAllEvents,
};
