import { Request, Response } from 'express';
import { bankTransferService } from '../services/transfer.services';

export const Transfer = (req: Request, res: Response) => {
    try {
        const { fromId, toId, amount } = req.body;
        if (!fromId || !toId || !amount) {
            return res.status(400).json({ message: 'Missing required query parameters' });
        }
        if (typeof fromId !== 'string' || typeof toId !== 'string' || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Invalid query parameters' });
        }
        
        const Value = Number(amount)
        if (Number.isNaN(Value) || Value <= 0) {
            return res.status(400).json({ message: 'Invalid transfer amount' });
        }
        if (fromId === toId) {
            return res.status(400).json({ message: 'Cannot transfer to the same walllet you send from' })
        }
        
        const result = bankTransferService.transfer(fromId, toId, Value);
        return res.status(200).json({ message: 'Transfer successful', data: result });
    } catch (error: any) {
        return res.status(400).json({ message: 'Transfer Failed. Error: ' + error.message });
    }

}

export const listTransfers = (req: Request, res: Response) => {
    const transfers = bankTransferService.listTransfer();
    if (!transfers) {
        return res.status(404).json({ message: 'Transfers not found'})
    }
    return res.status(200).json({ message: 'Transfers retrieved sucessfully', data: transfers})
}

export const getTransferById = (req: Request, res: Response) => {
    const transferId = req.params.id;
    const transfers = bankTransferService.listTransfersById(transferId);
    if (!transfers || transfers.length === 0) {
        return res.status(404).json({ message: 'Transfer not found' });
    }
    return res.status(200).json({ message: 'Transfer retrieved successfully', data: transfers });
}

export const getTransfersByWalletId = (req: Request, res: Response) => {
    const walletId = req.params.walletId;
    const transfers = bankTransferService.listTransfersByWalletId(walletId);
    if (!transfers || transfers.length === 0) {
        return res.status(404).json({ message: 'Transfers not found for the given wallet ID' });
    }
    return res.status(200).json({ message: 'Transfers retrieved successfully', data: transfers });
}
