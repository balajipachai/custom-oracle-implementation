const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');

require('dotenv').config();

const utils = require('./utils/');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: `${__dirname}/views/`,
    partialsDir: `${__dirname}/views/partials/`,
    // helpers: require(__dirname + '/views/helpers/index.js')
  }),
);

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
