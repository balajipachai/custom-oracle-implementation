const axios = require('axios');
const HelloWorld = require('../mocks');

jest.mock('axios');

describe('API TESTS FOR HELLOWORLD CONTRACT', () => {
  const MESSAGE = 'API TEST MESSAGE';
  it('/helloworld/change/message', async () => {
    const receipt = {
      status: 'success',
      message: 'Message changed successfully',
      data: [{
        blockHash: '0xdd4ff8e0fe8a930c7a9e935e439dba4815b550555382f4690f28997a940ee069',
        blockNumber: 499,
        contractAddress: null,
        cumulativeGasUsed: 34108,
        from: '0x88e4c9d8ffee25dbdd5d953e07735ed076b0164d',
        gasUsed: 34108,
        logs: [{
          address: '0x8081d6a05e8e23a611fe7683daddb0da4638ea88',
          blockHash: '0xdd4ff8e0fe8a930c7a9e935e439dba4815b550555382f4690f28997a940ee069',
          blockNumber: 499,
          data: '0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000170cdeea3200000000000000000000000000000000000000000000000000000000000000005432d33504f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005432d33504f000000000000000000000000000000000000000000000000000000',
          logIndex: 0,
          removed: false,
          topics: ['0x75e78660f6de36d856beac825c58ec6630080dcf028232921d15ef93179ba3bd'],
          transactionHash: '0x9de03021c7cc22d6cf9d93d6a0d7f8557cf123e28dc12c8b3de3ae61806e7c28',
          transactionIndex: 0,
        }],
        logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000200000000000000000000100000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        status: '0x1',
        to: '0x8081d6a05e8e23a611fe7683daddb0da4638ea88',
        transactionHash: '0x9de03021c7cc22d6cf9d93d6a0d7f8557cf123e28dc12c8b3de3ae61806e7c28',
        transactionIndex: 0,
      }],
    };
    const resp = { data: receipt };
    axios.post.mockResolvedValue(resp);
    const data = await HelloWorld.changeMessage(MESSAGE);
    return expect(data).toEqual(receipt);
  });

  it('/helloworld/message', async () => {
    const resp = {
      title: 'Current Message',
      status: 'success',
      flag: false,
      message: 'Current message in the HelloWorld contract is:',
      data: [MESSAGE],
    };
    axios.get.mockResolvedValue({ data: resp });
    const data = await HelloWorld.getCurrentMessage();
    return expect(data).toEqual(resp);
  });

  it('/helloworld/greeted/to', async () => {
    const resp = {
      title: 'Greeted Hello',
      status: 'success',
      flag: false,
      message: 'Greeted hello to:',
      data: ['Balaji Shetty Pachai'],
    };
    axios.get.mockResolvedValue({ data: resp });
    const data = await HelloWorld.getGreetedTo();
    return expect(data).toEqual(resp);
  });

  it('/helloworld/owner', async () => {
    const resp = {
      title: 'Contract Owner',
      status: 'success',
      flag: false,
      message: 'Address of contract owner is:',
      data: ['0x88e4c9d8ffee25dbdd5d953e07735ed076b0164d'],
    };
    axios.get.mockResolvedValue({ data: resp });
    const data = await HelloWorld.getOwner();
    return expect(data).toEqual(resp);
  });

  it('/helloworld/all/events', async () => {
    const resp = {
      title: 'All Events',
      status: 'success',
      flag: true,
      message: 'All emitted events are:',
      data: [{
        event: 'LogMessageChanged',
        blockHash: '0xca144da9b8bbb2887616e36416cd659c3ad8f1d2379702abd6d6df85eb96c9eb',
        blockNumber: 498,
        transactionHash: '0x2fbb6f5c79115a0e92adc1fedccb9b398e9f5bd8a84a05bf1d2e897d8eec0cb7',
        oldValue: 'Hello Sanket !',
        newValue: 'Hello, Akshay',
        timestamp: '3/12/2020, 2:18:48 PM',
      },
      {
        event: 'LogNameChanged',
        blockHash: '0xdd4ff8e0fe8a930c7a9e935e439dba4815b550555382f4690f28997a940ee069',
        blockNumber: 499,
        transactionHash: '0x9de03021c7cc22d6cf9d93d6a0d7f8557cf123e28dc12c8b3de3ae61806e7c28',
        oldValue: 'C-3PO',
        newValue: 'C-3PO',
        timestamp: '3/12/2020, 2:18:53 PM',
      },
      ],
    };
    axios.get.mockResolvedValue({ data: resp });
    const data = await HelloWorld.getOwner();
    return expect(data).toEqual(resp);
  });
});
