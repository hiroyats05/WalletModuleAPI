import { Request, Response } from 'express';
import { walletService } from '../services/wallet.services';

export const createWallet = (req: Request, res: Response) => {
    const rId = req.body.id ?? req.body.userId;
    const id: string | undefined = rId !== undefined ? String(rId).trim() : undefined;
    const balance: number | undefined = req.body.balance ?? req.body.initialBalance;
    const bank: string | undefined = req.body.bank;

    if (!id || balance === undefined || !bank) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (walletService.getWalletById(id)) {
        return res.status(409).json({ message: 'Wallet already exists' });
    }

    const wallet = walletService.createWallet(id, balance, bank);
    if (!wallet) {
        return res.status(409).json({ message: 'Wallet already exists' });
    }

    return res.status(201).json({ message: 'Wallet created successfully', data: wallet });
}

export const listWallet = (req: Request, res: Response) => {
    const wallet = walletService.getWallets();
    if (wallet.length === 0) {
        return res.status(404).json({ message: 'No wallet has been created' });
    }
    return res.status(200).json({ message: 'Wallet retrieved successfully', data: wallet });
};

export const getWalletById = (req: Request, res: Response) => {
    const wallet = walletService.getWalletById(req.params.id);
    if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
    }
    return res.status(200).json({ message: 'Wallet retrieved successfully', data: wallet });
}