import { Itinerary } from './itenary';
export class Account {
    cardAccountNumber: string;
    cardName: string;
    isEnabled: boolean = true;
    isSelected: boolean = false;;
    itineraries: Itinerary[] = [];
    imageUrl: string = "";

    get status(): string {
        return this.isEnabled ? "Active" : "InActive";
    }

    constructor(accountNumber: string) {
        this.cardAccountNumber = accountNumber;
    }
}