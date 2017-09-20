import { DestinationApiModel } from './destinationApiModel';
import { AccountApiModel } from './accountApiModel';

export class ItinenaryApiModel {
    returnDate: string;
    departureDate: string;
    destinations: DestinationApiModel[];
    primaryAccountNumbers: AccountApiModel[] = [];
}