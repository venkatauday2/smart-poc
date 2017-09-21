import { AccountApiModel } from './accountApiModel';

export class GetItineraryApiModel {
    retrieveTravelItinerary: GetItineraryRequest;
}

export class GetItineraryRequest {
    fromDate: string;
    toDate: string;
    primaryAccountNumber: AccountApiModel;
    partnerBid: string;

}