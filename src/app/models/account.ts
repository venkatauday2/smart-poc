import { Itinerary } from './itenary';
export class Account {
    cardAccountNumber: string;
    cardName: string;
    isActive: boolean = true;
    isSelected: boolean = false;
    showItinearies: boolean = false;
    itineraries: Itinerary[] = [];
    imageUrl: string = "";

    get status(): string {
        return this.isActive ? "Active" : "InActive";
    }

    constructor(accountNumber: string) {
        this.cardAccountNumber = accountNumber;
    }
}