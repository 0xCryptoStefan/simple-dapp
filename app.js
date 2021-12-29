// Validate app is loading
console.log("Page loaded as expected.")

// 1. Detect whether MetaMask is or is not installed
window.addEventListener('load', function() {
    if (typeof window.ethereum !== 'undefined') {
        let mmDetected = document.getElementById('mm-detected')
        mmDetected.innerHTML = "MetaMask has been detected!"
    }

    else {
        console.log('No wallet available!')
        this.alert("You need to install MetaMask or another wallet")
    }

    // 2. Allow the user to get access to MetaMask / Connect to MetaMask
    const mmEnable = document.getElementById('mm-connect');

    // mmEnable.onclick = () => {
    //     console.log("boop beep")
    // }

    mmEnable.onclick = async () => {
        await ethereum.request({ method: 'eth_requestAccounts'})

        const mmCurrentAccount = document.getElementById('mm-current-account');
        mmCurrentAccount.innerHTML = "Here's your current account: " + ethereum.selectedAddress    
    }

})

var web3 = new Web3(window.ethereum)

const ssSubmit = document.getElementById('ss-input-button');

ssSubmit.onclick = async () => {
    const ssValue = document.getElementById('ss-input-box').value;
    console.log(ssValue)

    // var web3 = new Web3(window.ethereum)

    const simpleStorage = new web3.eth.Contract(contractABI, contractAddress)

    simpleStorage.setProvider(window.ethereum)

    await simpleStorage.methods.store(ssValue).send({from: ethereum.selectedAddress})
    
}

const ssRetrieve = document.getElementById('ss-retrieve-button');

// ssRetrieve.onclick = async () => {
//     const bcStoredData = document.getElementById('bc-stored-data');
    
//     const simpleStorage = new web3.eth.Contract(contractABI, contractAddress)

//     simpleStorage.setProvider(window.ethereum)

//     let tempVar = simpleStorage.methods.retrieve().call();
//     bcStoredData.innerHTML = "Current stored value: " + tempVar[1];
//     simpleStorage.methods.retrieve().call().then(console.log);
//     // await simpleStorage.methods.store(ssValue).send({from: ethereum.selectedAddress})
    
// }


// window.addEventListener('load', function() {
//     const bcStoredData = document.getElementById('bc-stored-data');
//     const simpleStorage = new web3.eth.Contract(contractABI, contractAddress);
    
//     bcStoredData.innerHTML = simpleStorage.methods.retrieve().call();
//     simpleStorage.methods.retrieve().call().then(console.log);

//     let bcStoredDataF2 = document.getElementById('bc-stored-data-f2');
//     bcStoredDataF2.innerHTML = "Current stored value: " + simpleStorage.methods.retrieve().call();

//     })


// Ganache instance of contract
const contractAddress = "0x4C731975eAC37dc8EEEB2cFcFD3085d09F085a0f"

// Ganache-deployed contract ABI
const contractABI = [
	{
		"inputs": [],
		"name": "retrieve",
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
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

// I don't know why the below works
// Modified some code from: https://medium.com/coinmonks/a-really-simple-smart-contract-on-how-to-insert-value-into-the-ethereum-blockchain-and-display-it-62c455610e98
ssRetrieve.onclick = // location.reload();
// getValue();

//function to retrieve the last inserted value on the blockchain
function getValue() {
    try {
    //instantiate and connect to contract address via Abi
    // var myAbi = web3.eth.contract(contractABI);
    // var myfunction = myAbi.at(contractAddress);

    const bcStoredData = document.getElementById('bc-stored-data');
    const simpleStorage = new web3.eth.Contract(contractABI, contractAddress)
    
    //     simpleStorage.setProvider(window.ethereum)
    
    //     let tempVar = simpleStorage.methods.retrieve().call();
    //     bcStoredData.innerHTML = "Current stored value: " + tempVar[1];
    //     simpleStorage.methods.retrieve().call().then(console.log);



    //call the get function of our SimpleStorage contract
    simpleStorage.methods.retrieve().call(function (err, value) {
    if (err) { console.log(err) }
    if (value) {
    //display value on the webpage
    document.getElementById("bc-stored-data").innerHTML = "Current stored value: " + value;
    }
    });
    }
    catch (err) {
    document.getElementById("bc-stored-data").innerHTML = err;
    }
    }