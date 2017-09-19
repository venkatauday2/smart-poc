import { Destination } from './destination';
import { State } from './state';
import { Account } from './account';
export class Itenary {
    returnDate: string = "";
    departureDate: string = "";
    destinations: Destination[] = [];
    primaryAccountNumbers: Account[] = [];
    travelItineraryId: string = "";
}