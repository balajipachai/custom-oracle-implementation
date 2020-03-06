# custom-oracle-implementation
This repository specifies how an oracle can be implemented in case of getting off-chain data into the smart contract. This has been developed as per to the best of my knowledge, any suggestions, improvements, issues etc is highly appreciated.


# Overview
    Smart Contract HelloWorld acts as the initial point of invocation through which via websocket an event listener is set on LogMessageChanged, on receipt of LogMessageChanged event from the Node server, a name is fetched using https://swapi.co/api/people/ (This gets all the Star War character names), then we call changeName() using the Owner address from the backend.
    This implementation is based on my readings about how Oracles are implemented. Any suggestions, constructive criticism etc are most welcome.

# Let's get started

1. Clone the repository
    
    git clone https://github.com/balajipachai/custom-oracle-implementation.git
    
    git checkout development

2. Install dependencies

    npm install

3. Run a private Geth Node
    
    - Make sure you have geth installed if not [install geth](https://github.com/ethereum/go-ethereum/wiki/Installing-Geth)
    - [Create a Geth Private Network](https://hackernoon.com/setup-your-own-private-proof-of-authority-ethereum-network-with-geth-9a0a3750cda8)
    - Once you have gone through the above link, the below command will make a lot of sense
    - geth --datadir node1/ --syncmode 'full' --port 30301 --rpc --rpcaddr '127.0.0.1' --rpcport 8545 --rpcapi 'personal,eth,net,web3,txpool,miner' --rpccorsdomain "*" --ws --wsaddr '127.0.0.1' --wsport 8546 --wsapi 'personal,eth,net,web3,txpool,miner' --wsorigins "*" --networkid 85 --gasprice '1' --allow-insecure-unlock --unlock 'Coinbase' --password 'path/to/password/file' --mine console

4. NPM Scripts

    - Clean => npm run clean
    - Compile contracts => npm run compile
    - Lint contracts => npm run lint
    - Migrate contracts => npm run migrate
    - Test contracts => npm run test-contracts
    - ESLint report => npm run eslint-report

5. Updating .env file
    - PROTOCOL = 'http'
    - HOST = '127.0.0.1'
    - RPC_PORT = '8545'
    - WEBSOCKET_PROTOCOL = 'ws'
    - WEBSOCKET_PORT = '8546'
    - OWNER = *The address which deployed HelloWorld contract*
    - PASSWORD = 'password'
    - DATA_URL = 'https://swapi.co/api/people/'
    - CONTRACT_DEPLOYED_ADDRESS = *HelloWorld contracts deployed address*
    - ENVIRONMENT = 'development'

6. Start the server

    - npm run start
    - On the server side you can notice how the events are caught via websocket and further invocation to the smart contract is done.

7. Test oracle implementation via Postman

    - Get Current Message (GET) http://localhost:8080/helloworld/message

        - Response
        ```JSON
        {
            "status": "success",
            "message": "Current message",
            "data": [
                "Hello, Balaji Shetty Pachai"
            ]
        }
        ```
    - Get Greeted Hello To (GET) http://localhost:8080/helloworld/greeted/to

        - Response
        ```JSON
        {
            "status": "success",
            "message": "Greeted hello to",
            "data": [
                "Balaji Shetty Pachai"
            ]
        }
        ```
    - Get Contract Owner (GET http://localhost:8080/helloworld/owner

        - Response
        ```JSON
        {
            "status": "success",
            "message": "Contract owner",
            "data": [
                "0x88E4c9D8FfEe25dbdD5d953e07735ed076B0164D"
            ]
        }
        ```
    - Change Message (POST) http://localhost:8080/helloworld/change/message

        - Request body
        ```JSON
        {
	        "message": "Hello, Balaji Shetty Pachai"
        }
        ```

        - Response
        ```JSON
        {
            "status": "success",
            "message": "Message changed successfully",
            "data": [
                {
                    "blockHash": "0x5e9e85ef214e2b4ba6633cd8a0788f5d8a78d3b97840f3443261485ec2a2d10b",
                    "blockNumber": 474,
                    "contractAddress": null,
                    "cumulativeGasUsed": 35449,
                    "from": "0x88e4c9d8ffee25dbdd5d953e07735ed076b0164d",
                    "gasUsed": 35449,
                    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000008000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                    "status": true,
                    "to": "0x8081d6a05e8e23a611fe7683daddb0da4638ea88",
                    "transactionHash": "0xdc76d41846b8235615fa5edbe3c023aa4c17950223d05ddf04e41d8f55a47701",
                    "transactionIndex": 0,
                    "events": {
                        "LogMessageChanged": {
                            "address": "0x8081d6a05e8E23a611Fe7683dadDb0DA4638EA88",
                            "blockNumber": 474,
                            "transactionHash": "0xdc76d41846b8235615fa5edbe3c023aa4c17950223d05ddf04e41d8f55a47701",
                            "transactionIndex": 0,
                            "blockHash": "0x5e9e85ef214e2b4ba6633cd8a0788f5d8a78d3b97840f3443261485ec2a2d10b",
                            "logIndex": 0,
                            "removed": false,
                            "id": "log_6e069be8",
                            "returnValues": {
                                "0": "Hello, World!!!",
                                "1": "Hello, Balaji Shetty Pachai",
                                "2": "1583486158046",
                                "oldMessage": "Hello, World!!!",
                                "newMessage": "Hello, Balaji Shetty Pachai",
                                "timestamp": "1583486158046"
                            },
                            "event": "LogMessageChanged",
                            "signature": "0x181f8f95f4405c7ea1291c9569b4622a64e382da0135d4bdc33ff0418657861b",
                            "raw": {
                                "data": "0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000170af2144de000000000000000000000000000000000000000000000000000000000000001248656c6c6f2c204b6172616e2041726a756e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f48656c6c6f2c20446970656e6472610000000000000000000000000000000000",
                                "topics": [
                                    "0x181f8f95f4405c7ea1291c9569b4622a64e382da0135d4bdc33ff0418657861b"
                                ]
                            }
                        }
                    }
                }
            ]
        }
        ```
    - Get All Events (GET) http://localhost:8080/helloworld/all/events

        - Response
        ```JSON
        {
            "status": "success",
            "message": "All events",
            "data": [
                {
                    "event": "LogMessageChanged",
                    "blockHash": "0x8ddb8f02806e91f349b37643499fffa77b47b1a2dee4deed92765b5625212bfc",
                    "blockNumber": 44,
                    "transactionHash": "0x2e09c6df06576e14b707880ad0942b22fa3a64d7f8d11a30bac36e823dba84f6",
                    "oldMessage": "Hello, World !!!",
                    "newMessage": "Hello, Balaji Shetty Pachai",
                    "timestamp": "1583484007229"
                },
                {
                    "event": "LogMessageChanged",
                    "blockHash": "0x8e01a49ef9f48540a24966b5d9b43a388a58e7fcf099b54c609b4add2bf6d27a",
                    "blockNumber": 258,
                    "transactionHash": "0xf630fe91c5a208c233e7c094ae00f2c277380963c1c8479f1b52dcd90f8e7e87",
                    "oldMessage": "Hello, Balaji Shetty Pachai",
                    "newMessage": "Hello, KKHH",
                    "timestamp": "1583485077788"
                },
                {
                    "event": "LogMessageChanged",
                    "blockHash": "0xcea1b05c6d976b84deb7c59497b682ab2160c89017fca8d82e6ba2e29e3ca329",
                    "blockNumber": 271,
                    "transactionHash": "0xc2281328dbcb67da68d250a25991b9dbee264f7f0318decd0a58e226e725d357",
                    "oldMessage": "Hello, KKHH",
                    "newMessage": "Hello, KHNH",
                    "timestamp": "1583485142849"
                },
                {
                    "event": "LogMessageChanged",
                    "blockHash": "0xf95e57e08ea68ed78e2b11d0b49cbbb951d712a47e09f2a85173bdc917bf1168",
                    "blockNumber": 295,
                    "transactionHash": "0xfb12415736362b8e289eaea0d0925e24e0dd56137045ac13a9d294e56059ef6b",
                    "oldMessage": "Hello, KHNH",
                    "newMessage": "Hello, MDK",
                    "timestamp": "1583485259238"
                },
                {
                    "event": "LogMessageChanged",
                    "blockHash": "0x3c8a811eb63b62abae684cbab23e05b4c29e93d3ecd1e942cd81e239747908a8",
                    "blockNumber": 311,
                    "transactionHash": "0x9a86cb424814f550418e55ae7d1e1464b021ec7eb2453a62ace5d4cdc23a8de3",
                    "oldMessage": "Hello, MDK",
                    "newMessage": "Hello, MDK",
                    "timestamp": "1583485341722"
                },
                {
                    "event": "LogMessageChanged",
                    "blockHash": "0xb6cea39b9df211b6ba30f60243d5e9766cad062bbfafce07bb1c372e8a20c2ed",
                    "blockNumber": 393,
                    "transactionHash": "0x5d5266f76e08f41b58b31bc6122b0eaaf334aa9965c5f4d937b6cf33992e8101",
                    "oldMessage": "Hello, MDK",
                    "newMessage": "Hello, DDLJ",
                    "timestamp": "1583485750437"
                },
                {
                    "event": "LogMessageChanged",
                    "blockHash": "0xcc3c3e6dfa8d6f9cf383ad5c921abe7abe6e722d8a5ad199e109353c471586d8",
                    "blockNumber": 426,
                    "transactionHash": "0x5c93876e88fc38a0b72d2bc6674281c649d61185ac33aadc69d73196f3619a29",
                    "oldMessage": "Hello, DDLJ",
                    "newMessage": "Hello, Karan Arjun",
                    "timestamp": "1583485918136"
                },
                {
                    "event": "LogMessageChanged",
                    "blockHash": "0x3749f72be5f8e64f99221e2143d03955c4e5f373616e68eaaae5ce05d5ab3516",
                    "blockNumber": 438,
                    "transactionHash": "0xeebd51b4ad8640a74b2780d05ec71f3497816d19d3f405eb9f6606511155a60b",
                    "oldMessage": "Hello, Karan Arjun",
                    "newMessage": "Hello, Karan Arjun",
                    "timestamp": "1583485978812"
                },
                {
                    "event": "LogMessageChanged",
                    "blockHash": "0x5e9e85ef214e2b4ba6633cd8a0788f5d8a78d3b97840f3443261485ec2a2d10b",
                    "blockNumber": 474,
                    "transactionHash": "0xdc76d41846b8235615fa5edbe3c023aa4c17950223d05ddf04e41d8f55a47701",
                    "oldMessage": "Hello, Karan Arjun",
                    "newMessage": "Hello, Dipendra",
                    "timestamp": "1583486158046"
                },
                {
                    "event": "LogNameChanged",
                    "blockHash": "0x295ec973025e3e432f6a240d00952908f474b8eb2d306c5122f129daa4e14358",
                    "blockNumber": 440,
                    "transactionHash": "0x3bfe3b7034cce8245a7b9a61549fc26cd53c4b4b9f08fe63b986a1500bfd075f",
                    "oldName": "CONTRACT_OWNER",
                    "newName": "Leia Organa",
                    "timestamp": "1583485983461"
                },
                {
                    "event": "LogNameChanged",
                    "blockHash": "0x0faa7b56aea48274e85eb77a245130710fe0a7e7895ec6777378b5412f017b7c",
                    "blockNumber": 479,
                    "transactionHash": "0x11a201dfad659655d67d2872fc7984ce5af8ee1dbaae8eb826ef8c778114d26d",
                    "oldName": "Leia Organa",
                    "newName": "Darth Vader",
                    "timestamp": "1583486163334"
                }
            ]
        }
        ```

# Note
Feedbacks, suggestinons, constructive criticism, scope for improvement are most welcome.