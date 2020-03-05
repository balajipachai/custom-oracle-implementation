/* eslint-disable no-undef */
const HelloWorld = artifacts.require('HelloWorld');

module.exports = function deployHelloWorld(deployer, network, accounts) {
  const owner = accounts[0];
  deployer.deploy(HelloWorld, { from: owner });
};
