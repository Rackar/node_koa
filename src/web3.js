const Web3 = require('web3');
const WrapEvents = require("../models/WrapEvents");
const BuyEvents = require("../models/BuyEvents");
const freshGolbalPrice = require('./ethPrice')
const ObjectID = require("mongodb").ObjectID;

const web3 = new Web3()

/**
 * Refreshes provider instance and attaches even handlers to it
 */
function refreshProvider(web3Obj, providerUrl) {
    let retries = 0

    function retry(event) {
        if (event) {
            global.log('Web3 provider disconnected or errored. events :', event)
            retries += 1

            if (retries < 5) {
                global.log(` ${retries} times tried`)
                return setTimeout(refreshProvider, 5000)
            } else if (retries < 50) {
                global.log(`More than 5 times retries: ${retries} times tried.`)
                return setTimeout(refreshProvider, 20000)
            } else {
                global.log(`Max retries Ended: ${retries} times tried, exit.`)
                retries = 0
            }
        } else {
            global.log(`Reconnecting web3 provider, no retry event`)
            refreshProvider(web3Obj, providerUrl)
        }

        return null
    }

    const provider = new Web3.providers.WebsocketProvider(providerUrl, {
        clientConfig: {
            keepalive: true,
            keepaliveInterval: 60000	// milliseconds
        }
    })

    provider.on('end', () => {
        global.log('provider end event happened.', new Date())
        // return retry()
    })
    provider.on('error', () => {
        global.log('provider error event happened.', new Date())
        return retry()
    })

    web3Obj.setProvider(provider)

    global.log('New Web3 provider initiated')
    current.myContract = new web3Obj.eth.Contract(ABI, address); //dnft
    listenEvents()

    return provider
}

const myAddress = "0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490"

let address = "0xD49091863732A03901e46074127Fd04e15080572" //0312 kovan添加event
let ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "NFTCotract",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "NFTid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "dNFTid",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "Principal",
                "type": "address"
            }
        ],
        "name": "NewNFTwraped",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "values",
                "type": "uint256[]"
            }
        ],
        "name": "TransferBatch",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "TransferSingle",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "value",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "URI",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "Buyer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "dNFTid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "dNFTbought",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "artistWhiteList",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "accounts",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            }
        ],
        "name": "balanceOfBatch",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "dNFTid",
                "type": "uint256"
            }
        ],
        "name": "claim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claimOfficialFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "dNFTid",
                "type": "uint256"
            }
        ],
        "name": "claimPrincipalFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "dNFTid",
                "type": "uint256"
            }
        ],
        "name": "dNFTbuyer",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "dNFTid",
                "type": "uint256"
            }
        ],
        "name": "fundNFT",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "idTodNFT",
        "outputs": [
            {
                "internalType": "address",
                "name": "principal",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "contractAd",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "accProfitsPer_dNFT1e18",
                "type": "uint256"
            },
            {
                "internalType": "uint128",
                "name": "NFTid",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "dNFTid",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "lastBuyTimestamp",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "salesRevenue",
                "type": "uint128"
            },
            {
                "internalType": "bool",
                "name": "principalCanClaim",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "dNFTid",
                "type": "uint256"
            }
        ],
        "name": "isSellCompleted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "officialFunds",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeBatchTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "sellPersist",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "artist",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "permission",
                "type": "bool"
            }
        ],
        "name": "setArtist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "newSellPersist",
                "type": "uint256"
            }
        ],
        "name": "setSellPersist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "newUnitPrice",
                "type": "uint256"
            }
        ],
        "name": "setUnitPrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "dNFTid",
                "type": "uint256"
            }
        ],
        "name": "takeNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "dNFTid",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "holder",
                "type": "address"
            }
        ],
        "name": "unClaimOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "profits",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unitPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "uri",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "contractAd",
                "type": "address"
            },
            {
                "internalType": "uint128",
                "name": "NFTid",
                "type": "uint128"
            }
        ],
        "name": "wrap",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

let address_N = "0x227897e07508229AA6F794D39681428351447201"
let ABI_N = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "tokenURI",
                "type": "string"
            }
        ],
        "name": "awardItem",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "baseURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
let current = {}

function getSellingStatus(dnftid) {
    let myContract = current.myContract || init()
    return new Promise((resolve, reject) => {
        myContract.methods
            .idTodNFT(dnftid)
            .call()
            .then(function (result) {
                let { sellFinishTime, lastBuyTimestamp, salesRevenue } = result;
                let selling = false
                if (sellFinishTime) {
                    selling = false
                } else if (lastBuyTimestamp) {
                    let endDate = new Date(lastBuyTimestamp * 1000).getTime() + 24 * 60 * 60 * 1000;
                    selling = endDate > Date.now()
                } else {
                    selling = true
                }
                resolve(selling);
            })
            .catch((e) => {
                resolve(false)
                global.log(e);
            });
    });
}
// freshSelling()

async function freshSelling() { //定时查找销售中的dnft是否销售完成
    let wrapres = await WrapEvents.find({ "returnValues.Selling": { "$not": /false/ } })
    if (wrapres.length) {
        global.log('selling 状态未结束的数量为', wrapres.length)
    }

    let changedArray = []
    for (let index = 0; index < wrapres.length; index++) {
        const wrap = wrapres[index];
        let id = wrap.returnValues.dNFTid;
        let selling = await getSellingStatus(id)
        if (selling === false) {
            //更新状态
            wrap.returnValues.Selling = "false"
            changedArray.push(wrap)
        }
    }
    if (changedArray.length) {
        let ids = changedArray.map(ele => ObjectID(ele._id));
        let result = await WrapEvents.updateMany({
            _id: {
                $in: ids
            }
        }, { "$set": { "returnValues.Selling": "false" } })
        global.log(new Date(), " refresh selling data ", JSON.stringify(result))
    }

}

function listenEvents() {
    global.log('begin listen events')
    current.myContract.events.NewNFTwraped(
        {

        },
        async function (error, event) {
            if (error) {
                global.log(error.toString())
            } else {
                global.log("******wrap result:*******\n" + JSON.stringify(event));
                let wrap = new WrapEvents(event)
                let result = await wrap.save();
                global.log(result)
            }

        }
    );
    current.myContract.events.dNFTbought(
        {

        },
        async function (error, event) {
            if (error) {
                global.log(error.toString())
            } else {
                global.log("******buy result:*******\n" + JSON.stringify(event));
                let buy = new BuyEvents(event)
                let result = await buy.save();
                global.log(result)
            }
        }
    );

    //     //订阅
    // let subscription = web3.eth.subscribe('syncing', function (error, result) {
    //     if (!error) {
    //         global.log("******syncing result:*******\n" + JSON.stringify(result));
    //     }

    // });
    // let subscription2 = web3.eth.subscribe('logs', {
    //     address: '0xD49091863732A03901e46074127Fd04e15080572',
    //     topics: ['0x0df79c12', '0x167c576f']
    // }, function (error, result) {
    //     if (!error) {
    //         global.log("******logs result:*******\n" + JSON.stringify(result));
    //     }

    // });
    // let subscription3 = web3.eth.subscribe('newBlockHeaders', function (error, result) {
    //     if (!error) {
    //         global.log("******newBlockHeaders result:*******\n" + JSON.stringify(result));
    //     }

    // });
    // let subscription4 = web3.eth.subscribe('pendingTransactions', function (error, result) {
    //     if (!error) {
    //         global.log("******pendingTransactions result:*******\n" + JSON.stringify(result));
    //     }

    // });
    // // unsubscribes the subscription
    // subscription.unsubscribe(function(error, success){
    //     if(success)
    //         global.log('Successfully unsubscribed!');
    // });
}

async function syncEvents() {
    let wrapevents = await getPastEvents('NewNFTwraped')
    let buyevents = await getPastEvents('dNFTbought')
    let wrapres = await WrapEvents.find()
    let buyres = await BuyEvents.find()
    global.log(wrapevents.length, buyevents.length, wrapres.length, buyres.length)
    let addWraps = []
    let addBuyers = []
    for (let index = 0; index < wrapevents.length; index++) {
        const wrap = wrapevents[index];
        let exist = wrapres.some(w => w.transactionHash === wrap.transactionHash)
        if (!exist) {
            addWraps.push(wrap)
        }
    }
    for (let index = 0; index < buyevents.length; index++) {
        const buyer = buyevents[index];
        let exist = buyres.some(b => b.transactionHash === buyer.transactionHash)
        if (!exist) {
            addBuyers.push(buyer)
        }
    }
    if (addWraps.length) {
        let resW = await WrapEvents.insertMany(addWraps)
        global.log("与链上同步，已添加上架数据：", resW.length, "条")
    }
    if (addBuyers.length) {
        let resB = await BuyEvents.insertMany(addBuyers)
        global.log("与链上同步，已添加购买条数：", resB.length, "条")
    }
}


async function main() {
    current.myContract = init()
    // getPastEvents()
    // uri(2)
    // tokenUri(2)
    // listenEvents()
    syncEvents()
    // setInterval(syncEvents, 3600000) //TODO 监听失效报错，暂时屏蔽
    await freshGolbalPrice()
    global.log("Init eth Price loop every 10 minutes: ", global.ethPrice)
    await freshSelling()
    global.log("Selling status loop every 30 minutes")
    setInterval(freshGolbalPrice, 10 * 60 * 1000)
    setInterval(freshSelling, 30 * 60 * 1000)
}
// main()

// function init() {
//     const options = {
//         // Enable auto reconnection
//         reconnect: {
//             auto: true,
//             delay: 5000, // ms
//             maxAttempts: 5,
//             onTimeout: false
//         }
//     };
//     web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider("wss://kovan.infura.io/ws/v3/bd6e30f7beaf4dc9ad34adf9792bd509", options))
//     web3.eth.defaultAccount = myAddress;

//     let a = web3.eth.abi.encodeFunctionSignature('wrap(address,uint128)') //'0x0df79c12'
//     let b = web3.eth.abi.encodeFunctionSignature('dNFTbuyer(uint256)') //'0x167c576f'
//     global.log(a, b)

//     const myContract = new web3.eth.Contract(ABI, address); //dnft
//     // const myContract = new web3.eth.Contract(ABI_N, address_N); //nft
//     return myContract;
// }

function init() {
    refreshProvider(web3, 'wss://kovan.infura.io/ws/v3/bd6e30f7beaf4dc9ad34adf9792bd509')
    web3.eth.defaultAccount = myAddress;
    const myContract = new web3.eth.Contract(ABI, address); //dnft
    return myContract;
}


function uri(id) {
    return new Promise((resolve, reject) => {
        global.log(current);
        current.myContract.methods
            .uri(id)
            .call()
            .then(function (result) {
                global.log('uri: ' + JSON.stringify(result));
                resolve(result);
            })
            .catch((e) => global.log(e));
    });
}

function tokenUri(id) {
    return new Promise((resolve, reject) => {
        global.log(current);
        current.myContract.methods
            .tokenURI(id)
            .call()
            .then(function (result) {
                global.log('token uri: ' + JSON.stringify(result));
                resolve(result);
            })
            .catch((e) => global.log(e));
    });
}
// getPastEvents()

function getPastEvents(eventName = 'NewNFTwraped') {
    // current.myContract = init()
    return new Promise((resolve, reject) => {
        // global.log(current);
        current.myContract
            .getPastEvents(eventName, { fromBlock: 0, toBlock: 'latest' })
            .then(function (result) {
                // global.log('events: ' + JSON.stringify(result));
                resolve(result);
                let events = [
                    // {
                    //     address: '0x4667fbC2C61fb2370F8314b356924E01Fe2e1A6e',
                    //     blockHash:
                    //         '0xa0cc7d75b7e549c8ec6ac8d81d180886fedeb42d0eca34cff9420a8559a88b51',
                    //     blockNumber: 23861142,
                    //     logIndex: 3,
                    //     removed: false,
                    //     transactionHash:
                    //         '0xd7b90e62e5585eece2113b672e3787e1bd0d2c53a024f84ea0bc79c0354f0dcf',
                    //     transactionIndex: 1,
                    //     transactionLogIndex: '0x3',
                    //     type: 'mined',
                    //     id: 'log_cdb2d4d0',
                    //     returnValues: {
                    //         0: '0x227897e07508229AA6F794D39681428351447201',
                    //         1: '2',
                    //         2: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
                    //         NFTCotract: '0x227897e07508229AA6F794D39681428351447201',
                    //         NFTid: '2',
                    //         Principal: '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490',
                    //     },
                    //     event: 'NewNFTwraped',
                    //     signature:
                    //         '0x4958f28e48c3d79a95eee5a92db2dd8f218fce330b02d862233214f605baadd1',
                    //     raw: {
                    //         data: '0x',
                    //         topics: [
                    //             '0x4958f28e48c3d79a95eee5a92db2dd8f218fce330b02d862233214f605baadd1',
                    //             '0x000000000000000000000000227897e07508229aa6f794d39681428351447201',
                    //             '0x0000000000000000000000000000000000000000000000000000000000000002',
                    //             '0x00000000000000000000000065d17d3dc59b5ce3d4ce010eb1719882b3f10490',
                    //         ],
                    //     },
                    // },
                ];

                let NFTlist = events.map((res) => res.returnValues);
            })
            .catch((e) => global.log(e));
    });
}

exports.main = main
// exports.getPastEvents = getPastEvents
exports.getSellingStatus = getSellingStatus
exports.freshSelling = freshSelling