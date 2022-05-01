pragma solidity ^0.5;

import "./Transaction.sol";
import "./Specifications.sol";

// minimise amount of storage and compuations done by core functions
contract Splitwise is Specifications {
    
    Transaction transaction;
    
    constructor() public {
        transaction = new Transaction();
    }
    
    function amountOwed(address _debtor, address _creditor)
        public
        view
        returns (uint)
    {
        uint id = transaction.getTransactionHistory(_debtor, _creditor);
        if (id == 0 || transaction.isSettled(id)){
            return 0;
        }
        return transaction.getTransactionAmount(id);
    }
    
    function addTransaction(address _creditor, uint _amount)
        public
        validCreditor(_creditor)
    {
        bool isNew = true;
        uint id = transaction.getTransactionHistory(msg.sender, _creditor);
        if (id == 0) {
            transaction.add(msg.sender, _creditor, _amount);
        } else {
            isNew = false;
            transaction.UpdateTransaction(id, _amount);
        }
        
        emit TransferProcessed(id, isNew,
            msg.sender, _creditor, transaction.getTransactionAmount(id));
    }
    
    function modifyTransaction(uint id, uint _amountToReduce) public {
        require(id > 0, "zero is an invalid transfer id!");
        require(_amountToReduce > 0, "reducing by zero is a waste of gas!");
        require(_amountToReduce <= transaction.getTransactionAmount(id), "amountToReduce must be the minimum of a cycle!");
        transaction.modify(id, _amountToReduce);
        emit TransferProcessed(id, false,
            transaction.getTransasctionDebtor(id), transaction.getTransactionCreditor(id), transaction.getTransactionAmount(id));
    }
    

    function LatestTransferIndex()
        external
        view
        returns (uint)
    {
        return transaction.LatestTransactionId();
    }
    
    function getIthDebit(address _user, uint _index)
        external
        view
        returns (uint)
    {
        return transaction.debitTransfers(_user, _index);
    }

    function getIthCredit(address _user, uint _index)
        external
        view
        returns (uint)
    {
        return transaction.creditTransfers(_user, _index);
    }
    
    function getTransactionHistory(address _debtor, address _creditor)
        external
        view
        returns (uint)
    {
        return transaction.getTransactionHistory(_debtor, _creditor);
    }

    function getTransactionAmount(uint id)
        external
        view
        returns (uint)
    {
        return transaction.getTransactionAmount(id);
    }
     
    function getTransactionsCount(address _user)
        external
        view
        returns (uint)
    {
        return transaction.getCountOfTransactions(_user);
    }

    function getCreditTransactionsCount(address _user)
        external
        view
        returns (uint)
    {
        return transaction.getCountOfCreditTransactions(_user);
    }

     function isSettled(uint id)
        external
        view
        returns (bool)
    {
        return transaction.isSettled(id);
    }

    function getTransasctionDebtor(uint id)
        external
        view
        returns (address)
    {
        return transaction.getTransasctionDebtor(id);
    }

    
    function getTransactionCreditor(uint id)
        external
        view
        returns (address)
    {
        return transaction.getTransactionCreditor(id);
    }

    function getTransactionSlab(uint id)
        external
        view
        returns (string memory)
    {
        return transaction.getTransactionSlab(id);
    }


    function getTransferTimeStamp(uint id)
        external
        view
        returns (uint)
    {
        return transaction.getTransferTimeStamp(id);
    }

    
}
