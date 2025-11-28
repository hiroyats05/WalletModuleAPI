export default class transfer {
    id: string;
    fromId: string;
    toId: string;
    amount: number;

    constructor(id: string, fromId: string, toId: string, amount: number) {
        this.id = id;
        this.fromId = fromId;
        this.toId = toId;
        this.amount = amount;
    }
}