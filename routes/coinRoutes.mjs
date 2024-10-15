import express from 'express';
import { coins } from '../data/coins.mjs';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(coins);
});

export default router;