import { COUNTRIES, Country } from '../models/country';
import { State, STATES } from '../models/state';
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
            destinations.push(new Destination(this.getStateByCode(destination.state), this.getCountryByCode(destination.country)))
        }
        return destinations;
    }

    public getStateByCode(stateCode: string): State {
        for (let state of STATES) {
            if (state.code === stateCode) {
                return state;
            }
        }
        return null;
    }


    public getCountryByCode(countryCode: string): Country {
        for (let country of COUNTRIES) {
            if (country.code === countryCode) {
                return country;
            }
        }
        return null;
    }


    public buildprimaryAccountNumbers(primaryAccountNumbersApiModel: any[]): Account[] {
        let primaryAccountNumbers: Account[] = [];
        for (let account of primaryAccountNumbersApiModel) {
            primaryAccountNumbers.push(new Account(account.cardAccountNumber));
        }
        return primaryAccountNumbers;
    }

    public getCountryByName(countryName: string): Country {
        return new Country("840", "United States");
    }


    public getStateByName(stateName: string): State {

        if (stateName.toLowerCase().startsWith("te")) {

            return new State("TX", "Texas")
        } else {
            return new State("CA", "California")
        }
    }




    ////////////////////////////////////////////////////Convert Application Model to Api Model//////////////////////////////////////////////////////////////////////////


    public buildAddItineraryApiModel(itinenary: any, user: any): AddItenaryApiModel {
        let addItineraryApiModel = new AddItenaryApiModel();
        addItineraryApiModel.addTravelItinerary = this.buildItineraryApiModel(itinenary, user)
        return addItineraryApiModel;
    }


    public buildUpdateItineraryApiModel(itinenary: any, user: any): UpdateItenaryApiModel {
        let updateItineraryApiModel = new UpdateItenaryApiModel();
        updateItineraryApiModel.updateTravelItinerary = this.buildItineraryApiModel(itinenary, user);
        updateItineraryApiModel.travelItineraryId = itinenary.travelItineraryId;
        return updateItineraryApiModel;
    }


    public buildItineraryApiModel(itinerary: any, user: any): ItinenaryApiModel {
        let itinenaryApiModel = new ItinenaryApiModel();
        itinenaryApiModel.departureDate = itinerary.departureDate;
        itinenaryApiModel.returnDate = itinerary.returnDate;
        itinenaryApiModel.primaryAccountNumbers = [];
        itinenaryApiModel.destinations = [];
        itinenaryApiModel.partnerBid = user.partnerBid;
        itinenaryApiModel.userId = user.userId;

        // add accounts
        for (let cardNumber of itinerary.selectedCardNumbers) {
            let account = new AccountApiModel();
            account.cardAccountNumber = cardNumber;
            itinenaryApiModel.primaryAccountNumbers.push(account);
        }

        // add destinations
        for (let destination of itinerary.destinations) {
            let destApiModel = new DestinationApiModel(this.getStateByName(destination.state).code, this.getCountryByName(destination.country).code);
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