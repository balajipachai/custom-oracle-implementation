const axios = require('axios');

class HelloWorld {
  static async changeMessage(data) {
    const resp = await axios.post('/helloworld/change/message', data);
    return resp.data;
  }

  static async getCurrentMessage() {
    const resp = await axios.get('/helloworld/message');
    return resp.data;
  }

  static async getGreetedTo() {
    const resp = await axios.get('/helloworld/greeted/to');
    return resp.data;
  }

  static async getOwner() {
    const resp = await axios.get('/helloworld/owner');
    return resp.data;
  }
}

module.exports = HelloWorld;
