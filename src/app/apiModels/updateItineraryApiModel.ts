import { ItineraryApiModel } from '../apiModels/itineraryApiModel';

export class UpdateItenaryApiModel {
    userId: string;
    partnerBid: string;
    updateTravelItinerary: ItineraryApiModel;
    travelItineraryId: string;
}