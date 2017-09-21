export class Account {
    cardAccountNumber: string;
    isEnabled: boolean;
    isSelected: boolean;

    constructor(accountNumber: string) {
        this.cardAccountNumber = accountNumber;
    }
}