var contractAddress;
var debugging;
var abi = 
[

		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "txn_Id",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "bool",
					"name": "isNew",
					"type": "bool"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "debtor",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "address",
					"name": "creditor",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "TransferProcessed",
			"type": "event"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "address",
					"name": "_creditor",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				}
			],
			"name": "addTransaction",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_amountToReduce",
					"type": "uint256"
				}
			],
			"name": "modifyTransaction",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "address",
					"name": "_debtor",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_creditor",
					"type": "address"
				}
			],
			"name": "amountOwed",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "address",
					"name": "_user",
					"type": "address"
				}
			],
			"name": "getCreditTransactionsCount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "address",
					"name": "_user",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_index",
					"type": "uint256"
				}
			],
			"name": "getIthCredit",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "address",
					"name": "_user",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_index",
					"type": "uint256"
				}
			],
			"name": "getIthDebit",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				}
			],
			"name": "getTransactionAmount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				}
			],
			"name": "getTransactionCreditor",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "address",
					"name": "_debtor",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_creditor",
					"type": "address"
				}
			],
			"name": "getTransactionHistory",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "address",
					"name": "_user",
					"type": "address"
				}
			],
			"name": "getTransactionsCount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				}
			],
			"name": "getTransactionSlab",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				}
			],
			"name": "getTransasctionDebtor",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				}
			],
			"name": "getTransferTimeStamp",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				}
			],
			"name": "isSettled",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "LatestTransferIndex",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}
	
]
