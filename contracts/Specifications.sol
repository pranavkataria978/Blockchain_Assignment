pragma solidity ^0.5;

// minimise amount of storage and compuations done by core functions
contract Specifications {
    function addTransaction(address _creditor, uint _amount) public;
    function amountOwed(address _debtor, address _creditor) public view returns (uint);
    
    modifier validCreditor(address _user){
        require(_user != address(0), "Invalid Zero Address");
        require(_user != msg.sender, "We Cannot Credit Ourselves");
        _;
    }
    
    event TransferProcessed(
        uint txn_Id,
        bool isNew,
        address debtor,
        address creditor,
        uint amount
    );
    
}
