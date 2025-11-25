import { Router } from 'express';
import { listWallet, getWalletById, createWallet } from '../controllers/wallet.controller';
import { Transfer } from '../controllers/transfer.controller';

const router = Router();

router.get('/wallet', listWallet)
router.get('/wallet/:id', getWalletById)
router.post('/wallet', createWallet)
router.post('/transfer', Transfer)

export default router;