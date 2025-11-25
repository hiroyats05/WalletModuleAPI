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
        
        const result = bankTransferService.transfer(fromId, toId, Value);
        return res.status(200).json({ message: 'Transfer successful', data: result });
    } catch (error: any) {
        return res.status(400).json({ message: 'Transfer Failed. Error: ' + error.message });
    }

}
