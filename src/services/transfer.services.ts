import { walletService } from './wallet.services';
import transfer from '../models/transfer.model';

export class BankTransferService {
    private transfers: transfer[] = [];

    transfer(fromId: string, toId: string, amount: number) {
        const fromWallet = walletService.getWalletById(fromId);
        const toWallet = walletService.getWalletById(toId);

        if (!fromWallet || !toWallet) {
            throw new Error('Wallet not found');
        }
        if (amount <= 0) {
            throw new Error('Invalid transfer amount');
        }
        if (fromWallet.balance < amount) {
            throw new Error('Insufficient funds');
        }

        const id = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
        const transferHistoric = new transfer(id, fromId, toId, amount);

        fromWallet.balance -= amount;
        toWallet.balance += amount;

        this.transfers.push(transferHistoric);
        return { from: fromWallet, to: toWallet, amount, transferId: id };
    }

    listTransfer() {
        return this.transfers;
    }

    listTransfersById(transferId: string) {
        return this.transfers.filter(t => t.id === transferId);
    }

    listTransfersByWalletId(walletId: string) {
        return this.transfers.filter(t => t.fromId === walletId || t.toId === walletId);
    }
}

export const bankTransferService = new BankTransferService();