export default class Wallet {
    id: string;
    balance: number;
    bank: string;
    
    constructor(id: string, balance: number, bank: string) {
        this.id = id;
        this.balance = balance;
        this.bank = bank;
    }
}

