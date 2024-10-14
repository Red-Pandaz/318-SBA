let createWalletBtn = document.querySelector('#createWallet')
let viewWalletsBtn = document.querySelector('#viewWallets')
let walletDiv = document.querySelector('#walletDiv')
createWalletBtn.addEventListener('click', function(e){
    walletDiv.innerHTML = ''
    let createWalletForm = document.createElement('form')
    createWalletForm.action = "/api/wallet"
    createWalletForm.method = "POST"
})