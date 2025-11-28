import { Router } from 'express';
import { listWallet, getWalletById, createWallet } from '../controllers/wallet.controller';
import { getTransferById, getTransfersByWalletId, listTransfers, Transfer } from '../controllers/transfer.controller';

const router = Router();

router.get('/wallet', listWallet)
router.get('/wallet/:id', getWalletById)
router.get('/transfers', listTransfers)
router.get('/transfer/:id', getTransferById)
router.get('/transfers/wallet/:walletId', getTransfersByWalletId)
router.post('/wallet', createWallet)
router.post('/transfer', Transfer)

export default router;