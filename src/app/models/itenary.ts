import { Destination } from './destination';
import { State } from './state';
export class Itenary {
    returnDate: string;
    departureDate: string;
    destinations: Destination[];
    primaryAccountNumbers: Account[] = [];
    travelItineraryId: string;
}