import express from 'express';
import { wallets } from '../data/wallets.mjs';

import fs from 'fs';

const router = express.Router();

function saveWallets() {
    const fileContent = `export let wallets = ${JSON.stringify(wallets, null, 2)};`;
    fs.writeFileSync('./data/wallets.mjs', fileContent);
}

router.get('/', (req, res) => {
    console.log(wallets)
    // res.status(200).json(wallets);
    let options = {
        allWallets: wallets,
      };
      res.render('showWallets', options);
});
router.get('/new/', (req, res) => {
    console.log(wallets)
    // res.status(200).json(wallets);
    let options = {
        allWallets: wallets,
      };
      res.render('newWallet', options);
});

router.get('/:walletId', (req, res) => {
    const { walletId } = req.params;
    const wallet = wallets.find(w => w.id === walletId);

    if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
    }

    res.status(200).json(wallet);
});

router.post('/', (req, res) => {
    const { address, blockchain, asset, balance } = req.body;

    if (!address || !blockchain || !asset || balance == null) {
        return res.status(400).json({ message: "Address, blockchain, asset, and balance are required" });
    }

    let walletExists = wallets.some(w => w.address === address);
    if (walletExists) {
        return res.status(400).json({ message: "Wallet already exists" });
    }

    let newWallet = { 
        id: wallets.length + 1,
        address, 
        blockchain,
        subcurrencies: [{
            id: asset,
            quantity: parseFloat(balance) 
        }]
    };

    wallets.push(newWallet);

    saveWallets();  
    res.status(201).json(newWallet); 
});


// UPDATE: Update a wallet's subcurrencies (add/update balances)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { subcurrencies } = req.body;

    let wallet = wallets.find(w => w.id === id);

    if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
    }

    if (!subcurrencies) {
        return res.status(400).json({ message: "subcurrencies are required" });
    }

    // Update subcurrencies (add new balances or update existing ones)
    wallet.subcurrencies = { ...wallet.subcurrencies, ...subcurrencies };

    saveWallets();  // Save the updated array
    res.status(200).json(wallet);
});


// DELETE: Delete a wallet by od
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const walletIndex = wallets.findIndex(w => w.id === id);

    if (walletIndex === -1) {
        return res.status(404).json({ message: "Wallet not found" });
    }


    wallets.splice(walletIndex, 1);

    saveWallets();  
    res.status(204).send(); 
});

export default router;