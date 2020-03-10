const express = require('express');

const router = express.Router();

const controller = require('../controller/');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

router.get('/helloworld', (req, res) => {
  res.render('helloWorld', { title: 'HelloWorld' });
});

/**
 * API to ChangeMessage in HelloWorld Contract
 */
router.post('/helloworld/change/message', async (req, res) => {
  try {
    const result = await controller.helloWorldChangeMessage(req.body);
    res.json({
      status: 'success',
      message: 'Message changed successfully',
      data: [result],
    });
  } catch (e) {
    res.json({
      status: 'failure',
      message: e.message,
      data: [],
    });
  }
});

/**
 * APIs to get the current message, owner and greeted to values
 */
router
  .get('/helloworld/message', async (req, res) => {
    try {
      const result = await controller.helloWorldGetCurrentMessage();
      res.render('result', {
        title: 'Current Message',
        status: 'success',
        flag: false,
        message: 'Current message in the HelloWorld contract is:',
        data: [result],
      });
    } catch (e) {
      res.json({
        status: 'failure',
        message: e.message,
        data: [],
      });
    }
  })
  .get('/helloworld/greeted/to', async (req, res) => {
    try {
      const result = await controller.helloWorldGetGreetedHelloTo();
      res.render('result', {
        title: 'Greeted Hello',
        status: 'success',
        flag: false,
        message: 'Greeted hello to:',
        data: [result],
      });
    } catch (e) {
      res.json({
        status: 'failure',
        message: e.message,
        data: [],
      });
    }
  })
  .get('/helloworld/owner', async (req, res) => {
    try {
      const result = await controller.helloWorldGetContractOwner();
      res.render('result', {
        title: 'Contract Owner',
        status: 'success',
        flag: false,
        message: 'Address of contract owner is:',
        data: [result],
      });
    } catch (e) {
      res.json({
        status: 'failure',
        message: e.message,
        data: [],
      });
    }
  })
  .get('/helloworld/all/events', async (req, res) => {
    try {
      const result = await controller.helloWorldGetAllEvents();
      // console.log('result of all events: ', result);
      const sortedResult = result.sort((obj1, obj2) => obj1.blockNumber - obj2.blockNumber);
      res.render('result', {
        title: 'All Events',
        status: 'success',
        flag: true,
        message: 'All emitted events are:',
        data: sortedResult,
      });
    } catch (e) {
      res.json({
        status: 'failure',
        message: e.message,
        data: [],
      });
    }
  });


module.exports = router;
