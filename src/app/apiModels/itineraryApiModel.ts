import { DestinationApiModel } from './destinationApiModel';
import { AccountApiModel } from './accountApiModel';

export class ItinenaryApiModel {
    userId: string;
    partnerBid: string;
    returnDate: string;
    departureDate: string;
    destinations: DestinationApiModel[];
    primaryAccountNumbers: AccountApiModel[] = [];
}