import Wallet from '../models/wallet.model'

export class WalletService {
    private wallets: Map<string, Wallet> = new Map();
    
    createWallet(id: string, balance: number, bank: string): Wallet {
        const wallet = new Wallet(id, balance, bank);
        this.wallets.set(id, wallet);
        return wallet;
    }

    getWallets(): Wallet[] {
        return Array.from(this.wallets.values());
    }

    getWalletById(id: string): Wallet | undefined {
        return this.wallets.get(id);
    }

}

export const walletService = new WalletService();