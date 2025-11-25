import { Request, Response } from 'express';
import { walletService } from '../services/wallet.services';

export const createWallet = (req: Request, res: Response) => {
    const { id, balance, bank } = req.body;
    if (!id || balance === undefined || !bank) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const wallet = walletService.createWallet(id, balance, bank);
    return res.status(201).json({ message: 'Wallet created successfully', data: wallet });
    
}

export const listWallet = (req: Request, res: Response) => {
    const wallet = walletService.getWallets();
    if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
    }
    return res.json(wallet), res.status(200).json({ message: 'Wallet retrieved successfully' });
};

export const getWalletById = (req: Request, res: Response) => {
    const wallet = walletService.getWalletById(req.params.id);
    if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
    }
    return res.json(wallet), res.status(200).json({ message: 'Wallet retrieved successfully' });
}