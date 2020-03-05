/* eslint-disable no-undef */
const Migrations = artifacts.require('./Migrations.sol');
module.exports = function deployMigrations(deployer) {
  deployer.deploy(Migrations);
};
