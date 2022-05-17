pragma solidity >=0.7.0 <0.9.0;

contract Validation {

// owner
address owner;
Payee[] public payees;

struct Payee {
    address payable contractOwner;
    address payable walletAddress;
    string companyName;
    uint releaseTime;
    uint amount;
    bool canWithdraw;
}

constructor() {
    owner = msg.sender;
}

function addPayee(address payable _owner, address payable _wallet, string memory _company, uint _release, uint _amount, bool _withdraw) public {
    payees.push(Payee(_owner, _wallet, _company, _release, _amount, _withdraw));
}

function deposit(address wallet) payable public {
    addToCompanyBalance(wallet);
}

function addToCompanyBalance(address wallet) private {
    for(uint i = 0; i < payees.length; ++i){
        if(payees[i].walletAddress == wallet){
            payees[i].amount += msg.value;
        }
    }
}

function getIndex(address wallet) view private returns(uint){
    for(uint i = 0; i < payees.length; ++i){
        if(payees[i].walletAddress == wallet){
            return i;
        }
    }
    return 100;
}

function availWithdraw(address wallet) private {
    uint i = getIndex(wallet);
    if(block.timestamp > payees[i].releaseTime) {
        payees[i].canWithdraw = true;
    } else {
    }
}

function withdraw(address payable wallet) payable public {
    availWithdraw(wallet);
    uint i = getIndex(wallet);
    require(msg.sender == payees[i].walletAddress, 'You must be the payee to withdraw.');
    require(payees[i].canWithdraw == true, 'You cannot withdraw yet');
    payees[i].walletAddress.transfer(payees[i].amount);
}

function cancelContract(address wallet) public {
    uint i = getIndex(wallet);
    require(msg.sender == payees[i].walletAddress, 'You must be the owner of the contract.');
    delete payees[i];
}
}