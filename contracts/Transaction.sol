pragma solidity ^0.5;

contract Transaction {
    struct Transfer {
        uint amount;
        bool isSettled;
        uint time;
        string txn_slab;
        address debtor;
        address creditor;
        uint id;

    }
    
    mapping (uint => Transfer) public Transfers;
    mapping (address => uint[]) public debitTransfers;
     mapping (address => uint[]) public creditTransfers;

    uint public LatestTransactionId = 0;
    
   
    function add(address _debtor, address _creditor, uint _amount) external {
        LatestTransactionId++;
        Transfer memory t = Transfer({
            id: LatestTransactionId,
            debtor: _debtor,
            creditor: _creditor,
            amount: _amount,
            isSettled: false,
            time: now,
            txn_slab: "null"
        });
        Transfers[LatestTransactionId] = t;
        if(Transfers[LatestTransactionId].amount >= 1000)
            Transfers[LatestTransactionId].txn_slab = "high";
        else if(Transfers[LatestTransactionId].amount < 1000)
            Transfers[LatestTransactionId].txn_slab = "low";
        debitTransfers[_debtor].push(LatestTransactionId);
        creditTransfers[_creditor].push(LatestTransactionId);
    }
    
     function getTransactionHistory(address _debtor, address _creditor) 
        public 
        view 
        returns (uint)
    {
        uint[] memory relevantTfs = debitTransfers[_debtor];
        for (uint i = 0; i < relevantTfs.length; i++){
            if (Transfers[relevantTfs[i]].creditor == _creditor) {
                return Transfers[relevantTfs[i]].id;
            }
        }
        return 0;
    }
    
    function getCreditTransactionHistory(address _debtor, address _creditor) 
        public 
        view 
        returns (uint)
    {
        uint[] memory relevantTfs = creditTransfers[_creditor];
        for (uint i = 0; i < relevantTfs.length; i++){
            if (Transfers[relevantTfs[i]].debtor == _debtor) {
                return Transfers[relevantTfs[i]].id;
            }
        }
        return 0;
    }


    function UpdateTransaction(uint id, uint _amount) external {
        Transfers[id].amount += _amount;
        if(Transfers[id].amount >= 1000)
            Transfers[id].txn_slab = "high";
        Transfers[id].isSettled = false;
    }

     function modify(uint id, uint amountToReduce) public {
        Transfers[id].amount -= amountToReduce;
        if(Transfers[id].amount <1000 && Transfers[id].amount != 0)
             Transfers[id].txn_slab = "high";
        if (Transfers[id].amount == 0){
            Transfers[id].isSettled = true;
        }
    }
       
    function getCountOfTransactions(address _debtor) 
        public 
        view 
        returns (uint)
    {
        return debitTransfers[_debtor].length;
    }
    
    function getCountOfCreditTransactions(address _creditor) 
        public 
        view 
        returns (uint)
    {
        return creditTransfers[_creditor].length;
    }

      function isSettled(uint id) 
        external 
        view 
        returns (bool)
    {
        return Transfers[id].isSettled;
    }
   
    
    function getTransactionAmount(uint id) 
        external 
        view 
        returns (uint)
    {
        return Transfers[id].amount;
    }


    function getTransasctionDebtor(uint id) 
        external 
        view 
        returns (address)
    {
        return Transfers[id].debtor;
    }
    
    function getTransactionCreditor(uint id) 
        external 
        view 
        returns (address)
    {
        return Transfers[id].creditor;
    }
    
    function getTransactionSlab(uint id) 
        external 
        view 
        returns (string memory)
    {
        return Transfers[id].txn_slab;
    }
    
  

    function getIthDebit(address _user, uint _index) 
        external 
        view 
        returns (uint)
    {
        return debitTransfers[_user][_index];
    }

    function getIthCredit(address _user, uint _index) 
        external 
        view 
        returns (uint)
    {
        return creditTransfers[_user][_index];
    }
    
    
    function getTransferTimeStamp(uint id) 
        external 
        view 
        returns (uint)
    {
        return Transfers[id].time;
    }
}

