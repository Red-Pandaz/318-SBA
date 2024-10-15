
let createWalletBtn = document.querySelector('#createWallet')
let viewWalletsBtn = document.querySelector('#viewWallets')
let walletDiv = document.querySelector('#walletDiv')
window.addEventListener('load', async function(e){
    console.log('load')
    try{
        let response = await fetch('/api/wallets');
        let data = await response.json();
        console.log(data); // Log the data you need
    } catch(err){
        console.log(err)
    }
})
// createWalletBtn.addEventListener('click', function(e){
//     walletDiv.innerHTML = ''
//     let createWalletForm = document.createElement('form')
//     createWalletForm.action = "/api/wallet"
//     createWalletForm.method = "POST"
// })
// viewWalletsBtn.addEventListener('click', function(e){
//     walletDiv.innerHTML = ''
//     let wallets = await (async () => {
//         try {
//             const response = await fetch('/api/wallets', {
//                 method: 'GET',
//             });

//             if (response.ok) {
//                 let wallets = await response.json();
//                 return wallets
//             } else {
//                 console.error('Error fetching wallets:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error fetching wallets:', error);
//         }

//     })()
//     for(let wallet of wallets){
//         let walletForm = document.createElement('form')
//         walletForm.innerHTML = `
//             <h4>Wallet Id${wallet.Id}<    
//         `
//         for(let subcurrency of wallet.subcurrencies){
//             let currency = Object.keys(subcurrency)
//             let value = subcurrency[currency]
//             console.log(currency, value)
//         }
//     }
// })