import { GetItineraryApiModel, GetItineraryRequest } from '../apiModels/getItineraryApiModel';
import { Destination } from '../models/destination';
import { Itinerary } from '../models/itenary';
import { Account } from '../models/account';
import { Injectable } from '@angular/core';



@Injectable()
export class DataMapper {

    ///////////////////////////////////////Convert Api Model to Application Model or Typescript Model////////////////////

    public mapApiDataToItineraryModel(itinerariesApiModel: any[]): Itinerary[] {

        let itineraries: Itinerary[] = [];

        if (itinerariesApiModel) {
            for (let itinerary of itinerariesApiModel) {
                itineraries.push(this.buildItinerary(itinerary));
            }
        }
        return itineraries;
    }

    public buildItinerary(itineraryApiModel: any): Itinerary {

        let itinerary = new Itinerary();
        itinerary.returnDate = itineraryApiModel.returnDate;
        itinerary.departureDate = itineraryApiModel.departureDate;
        itinerary.destinations = this.buildDestinations(itineraryApiModel.destinations);
        itinerary.primaryAccountNumbers = this.buildprimaryAccountNumbers(itineraryApiModel.primaryAccountNumbers)
        itinerary.travelItineraryId = itineraryApiModel.travelItineraryId;
        return itinerary;
    }

    public buildDestinations(destinationsApiModel: any[]): Destination[] {
        let destinations: Destination[] = [];
        for (let destination of destinationsApiModel) {
            destinations.push(new Destination(destination.state, destination.country))
        }
        return destinations;
    }

    public buildprimaryAccountNumbers(primaryAccountNumbersApiModel: any[]): Account[] {
        let primaryAccountNumbers: Account[] = [];
        for (let account of primaryAccountNumbersApiModel) {
            primaryAccountNumbers.push(new Account(account.cardAccountNumber));
        }
        return primaryAccountNumbers;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public buildGetItineraryApiModel(data: any,accountNumber:string): GetItineraryApiModel {

        let retrieveTravelItinerary = new GetItineraryRequest();
        retrieveTravelItinerary.fromDate = data.fromDate ? data.fromDate : "2017-09-01"
        retrieveTravelItinerary.toDate = data.toDate;
        retrieveTravelItinerary.primaryAccountNumber = new Account(accountNumber);
        retrieveTravelItinerary.partnerBid = data.partnerBid
        let getItineraryApiModel = new GetItineraryApiModel();
        getItineraryApiModel.retrieveTravelItinerary = retrieveTravelItinerary;
        return getItineraryApiModel;
    }
}