import express from 'express';
import { wallets } from '../data/wallets.mjs';

import fs from 'fs';

const router = express.Router();

function saveWallets() {
    const fileContent = `export let wallets = ${JSON.stringify(wallets, null, 2)};`;
    fs.writeFileSync('../data/wallets.mjs', fileContent);
}

router.get('/', (req, res) => {
    console.log(wallets)
    res.status(200).json(wallets);
});

router.get('/wallets/:walletId', (req, res) => {
    const { walletId } = req.params;
    const wallet = wallets.find(w => w.id === walletId);

    if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
    }

    res.status(200).json(wallet);
});

router.post('/wallets', (req, res) => {
    const { id, address, chainId, subcurrencies } = req.body;

    if (!id || !address || !chainId || !subcurrencies) {
        return res.status(400).json({ message: "id, address, chainId and subcurrencies are required" });
    }

    const walletExists = wallets.some(w => w.id === id);
    if (walletExists) {
        return res.status(400).json({ message: "Wallet already exists" });
    }

    const newWallet = { id, address, subcurrencies };
    wallets.push(newWallet);

    saveWallets();  // Save the updated array
    res.status(201).json(newWallet);
});

// UPDATE: Update a wallet's subcurrencies (add/update balances)
router.put('/wallets/:id', (req, res) => {
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
router.delete('/wallets/:id', (req, res) => {
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