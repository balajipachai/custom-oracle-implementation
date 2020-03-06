pragma solidity 0.6.1;

contract HelloWorld {
    string public message;
    string public greetedHelloTo;
    address public owner;

    event LogMessageChanged(
        string oldMessage,
        string newMessage,
        uint256 timestamp
    );

    event LogNameChanged(
        string oldName,
        string newName,
        uint256 timestamp
    );

    // Modifier onlyOwner
    modifier onlyOwner() {
        require(owner == msg.sender, "Caller is not the contract owner");
        _;
    }

    constructor() public {
        message = "Hello, World !!!";
        owner = msg.sender;
        greetedHelloTo = "CONTRACT_OWNER";
    }

    /**
    * Function to update the message with the name that is passed as a parameter
    */
    function changeName(string calldata _name, uint256 _timestamp) external onlyOwner {
        string memory oldName = greetedHelloTo;
        greetedHelloTo = _name;
        emit LogNameChanged(oldName, greetedHelloTo, _timestamp);
    }

    /**
    * Function to change the message
    * @param _newMessage {string} The new message
     */
    function changeMessage(string memory _newMessage, uint256 _timestamp)
        public
    {
        string memory oldMessage = message;
        message = _newMessage;
        emit LogMessageChanged(oldMessage, _newMessage, _timestamp);
    }
}
