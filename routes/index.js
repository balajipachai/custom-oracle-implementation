const express = require('express');

const router = express.Router();

const controller = require('../controller/');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
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
      res.json({
        status: 'success',
        message: 'Current message',
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
      res.json({
        status: 'success',
        message: 'Greeted hello to',
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
      res.json({
        status: 'success',
        message: 'Contract owner',
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
      res.json({
        status: 'success',
        message: 'All events',
        data: result,
      });
    } catch (e) {
      res.json({
        status: 'failure',
        message: e.message,
        data: [],
      });
    }
  })


module.exports = router;
