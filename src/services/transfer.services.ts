import { walletService } from './wallet.services';

export class BankTransferService {

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

        fromWallet.balance -= amount;
        toWallet.balance += amount;

        return { from: fromWallet, to: toWallet, amount };
    }
}

export const bankTransferService = new BankTransferService();