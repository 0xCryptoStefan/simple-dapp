console.log("hello")

window.addEventListener('load', function() {
    if (typeof window.ethereum !== 'undefined') {
        let mmDetected = document.getElementById('mm-detected')
        mmDetected.innerHTML = "MetaMask has been detected!"
    }

    else {
        console.log('Now wallet available!')
        this.alert("You need to install MetaMask or another wallet")
    }

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

// insert ABI code as a const



const ssSubmit = document.getElementById('ss-input-button');

ssSubmit.onclick = async () => {
    const ssValue = document.getElementById('ss-input-box').value;
    console.log(ssValue)

    var web3 = new Web3(window.ethereum)

    const simpleStorage = new web3.eth.Contract(ssABI, ssAddress)

    // simpleStorage.setProvider(window.ethereum)

    await simpleStorage.methods.store(ssValue).send({from: ethereum.selectedAddress})
    
}
