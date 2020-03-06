const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();

const utils = require('./utils/');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// For Geth
const helloWorldJson = require('./build/contracts/HelloWorld.json');

const HelloWorldContract = utils.getContractFromJSON(helloWorldJson);
const helloWorldInstance = utils.initialSetup(HelloWorldContract, true, process.env.ENVIRONMENT);

// Sets the watch on event
const watchParams = {
  contractInstance: helloWorldInstance,
  eventName: 'LogMessageChanged',
};
utils.setWatchOnEvents(watchParams);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
