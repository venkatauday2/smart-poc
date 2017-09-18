export class Account {
    cardAccountNumber: string;
    isEnabled: boolean;
    isSelected: boolean;

    constructor(accountNumber: string, isEnabled: boolean, isSelected: boolean) {

        this.cardAccountNumber = accountNumber;
        this.isEnabled = isEnabled;
        this.isSelected = isSelected;

    }
}