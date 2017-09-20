import { ItinenaryApiModel } from '../apiModels/itineraryApiModel';

export class UpdateItenaryApiModel {
    userId: string;
    partnerBid: string;
    updateTravelItinerary: ItinenaryApiModel;
    travelItineraryId: string;
}