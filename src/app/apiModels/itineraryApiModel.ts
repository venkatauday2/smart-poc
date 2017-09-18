import { DestinationApiModel } from './destinationApiModel';
import { AccountApiModel } from './accountApiModel';

export class ItineraryApiModel {
    returnDate: string;
    departureDate: string;
    destinations: DestinationApiModel[];
    primaryAccountNumbers: AccountApiModel[] = [];
}