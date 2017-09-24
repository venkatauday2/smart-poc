import { DeleteItineraryRequest } from '../apiModels/deleteItineraryRequest';
import { DestinationApiModel } from '../apiModels/destinationApiModel';
import { AccountApiModel } from '../apiModels/accountApiModel';
import { ItinenaryApiModel } from '../apiModels/itineraryApiModel';
import { UpdateItenaryApiModel } from '../apiModels/updateItineraryApiModel';
import { AddItenaryApiModel } from '../apiModels/addItenaryApiModel';
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

    
    ////////////////////////////////////////////////////Convert Application Model to Api Model//////////////////////////////////////////////////////////////////////////


    public buildAddItineraryApiModel(itinenary: any, user: any): AddItenaryApiModel {
        let addItineraryApiModel = new AddItenaryApiModel();
        addItineraryApiModel.userId = user.userId
        addItineraryApiModel.partnerBid = user.partnerBid
        addItineraryApiModel.addTravelItinerary = this.buildItineraryApiModel(itinenary)
        return addItineraryApiModel;
    }


    public buildUpdateItineraryApiModel(itinenary: any, user: any): UpdateItenaryApiModel {
        let updateItineraryApiModel = new UpdateItenaryApiModel();
        updateItineraryApiModel.userId = user.userId
        updateItineraryApiModel.partnerBid = user.partnerBid
        updateItineraryApiModel.updateTravelItinerary = this.buildItineraryApiModel(itinenary);
        updateItineraryApiModel.travelItineraryId = itinenary.travelItineraryId;
        return updateItineraryApiModel;
    }


    public buildItineraryApiModel(itinerary: any): ItinenaryApiModel {
        let itinenaryApiModel = new ItinenaryApiModel();
        itinenaryApiModel.departureDate = itinerary.departureDate;
        itinenaryApiModel.returnDate = itinerary.returnDate;
        itinenaryApiModel.primaryAccountNumbers = [];
        itinenaryApiModel.destinations = [];

        // add accounts
        for (let cardNumber of itinerary.selectedCardNumbers) {
            let account = new AccountApiModel();
            account.cardAccountNumber = cardNumber;
            itinenaryApiModel.primaryAccountNumbers.push(account);
        }

        // add destinations
        for (let destination of itinerary.destinations) {
            let destApiModel = new DestinationApiModel(destination.state, destination.country);
            itinenaryApiModel.destinations.push(destApiModel);
        }

        return itinenaryApiModel;
    }


    public buildGetItineraryApiModel(data: any): GetItineraryApiModel {

        let retrieveTravelItinerary = new GetItineraryRequest();
        retrieveTravelItinerary.fromDate = data.fromDate ? data.fromDate : "2017-09-01"
        retrieveTravelItinerary.toDate = data.toDate;
        retrieveTravelItinerary.primaryAccountNumber = new Account(data.primaryAccountNumber);
        retrieveTravelItinerary.partnerBid = data.partnerBid
        let getItineraryApiModel = new GetItineraryApiModel();
        getItineraryApiModel.retrieveTravelItinerary = retrieveTravelItinerary;
        return getItineraryApiModel;
    }


    public buildDeleteItineraryApiRequest(deleteItinerary: any): DeleteItineraryRequest {
        let requestBody = new DeleteItineraryRequest();
        requestBody.deleteTravelItinerary = {
            travelItineraryId: deleteItinerary.travelItineraryId
        }
        return requestBody;
    }
}