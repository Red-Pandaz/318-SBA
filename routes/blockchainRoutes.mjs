import express from 'express';
import { blockchains } from '../data/blockchains.mjs';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(blockchains);
});

export default router;