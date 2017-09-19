import { Observable } from 'rxjs/Rx';
import { UpdateItenaryApiModel } from '../apiModels/updateItineraryApiModel';
import { DestinationApiModel } from '../apiModels/destinationApiModel';
import { AccountApiModel } from '../apiModels/accountApiModel';
import { ItineraryApiModel } from '../apiModels/itineraryApiModel';
import { AddItenaryApiModel } from '../apiModels/addItenaryApiModel';
import { Account } from '../models/account';
import { Destination } from '../models/destination';
import { Itenary } from '../models/itenary';

import { User } from '../models/user';
import { SmartApiService } from './smart-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SmartDataService {

  public user: User;
  public isloadingUserInfo: boolean = false;

  constructor(private smartApiService: SmartApiService) {
    this.loadUser();
  }

  public loadUser(): void {

    this.isloadingUserInfo = true;

    if (this.user === undefined) {
      this.smartApiService.getUser().then((data) => {
        this.user = data;
        this.isloadingUserInfo = false;
      }).catch((response) => {
        console.log(response);
        this.isloadingUserInfo = false;
      });
    }
  }

  public addUserItenary(itenary: any) {

    var itenaryModel = new Itenary();
    itenaryModel.returnDate = itenary.returnDate;
    itenaryModel.departureDate = itenary.departureDate;
    itenaryModel.destinations = [new Destination(itenary.state, itenary.country)];
    itenaryModel.primaryAccountNumbers = [];
    itenaryModel.travelItineraryId = itenary.travelItineraryId;

    for (let cardNumber of itenary.selectedCardNumbers) {
      itenaryModel.primaryAccountNumbers.push(new Account(cardNumber.toString(), false, false));
    }

    this.user.itenaries.push(itenaryModel);
  }


  public updateUserItenary(itenary: any) {

    var itenaryModel = this.findItineraryById(itenary.travelItineraryId);
    itenaryModel.returnDate = itenary.returnDate;
    itenaryModel.departureDate = itenary.departureDate;
    itenaryModel.destinations = [new Destination(itenary.state, itenary.country)];
    itenaryModel.primaryAccountNumbers = [];
    itenaryModel.travelItineraryId = itenary.travelItineraryId;

    for (let cardNumber of itenary.selectedCardNumbers) {
      itenaryModel.primaryAccountNumbers.push(new Account(cardNumber.toString(), false, false));
    }
  }

  private findItineraryById(id: string): Itenary {

    for (let itinenary of this.user.itenaries) {
      if (itinenary.travelItineraryId === id)
        return itinenary;
    }
    return null;

  }


  public addItinerary(itinerary: any): Observable<any> {
    return this.smartApiService.addItinerary(this.buildAddItineraryApiModel(itinerary));
  }

  public updateItinerary(travelItineraryId: string, itinerary: any): Observable<any> {
    return this.smartApiService.updateItinerary(this.buildUpdateItineraryApiModel(travelItineraryId, itinerary));
  }

  private buildAddItineraryApiModel(itinerary: any): AddItenaryApiModel {
    let addItineraryApiModel = new AddItenaryApiModel();
    addItineraryApiModel.userId = this.user.userId
    addItineraryApiModel.partnerBid = this.user.partnerBid
    addItineraryApiModel.addTravelItinerary = this.buildItineraryApiModel(itinerary)
    return addItineraryApiModel;
  }


  private buildUpdateItineraryApiModel(travelItineraryId: string, itinerary: any): UpdateItenaryApiModel {
    let updateItineraryApiModel = new UpdateItenaryApiModel();
    updateItineraryApiModel.userId = this.user.userId
    updateItineraryApiModel.partnerBid = this.user.partnerBid
    updateItineraryApiModel.updateTravelItinerary = this.buildItineraryApiModel(itinerary);
    updateItineraryApiModel.travelItineraryId = travelItineraryId;
    return updateItineraryApiModel;
  }


  private buildItineraryApiModel(itinerary: any): ItineraryApiModel {
    let itineraryApiModel = new ItineraryApiModel();
    itineraryApiModel.departureDate = itinerary.departureDate;
    itineraryApiModel.returnDate = itinerary.returnDate;
    itineraryApiModel.primaryAccountNumbers = [];

    for (let cardNumber of itinerary.cardNumbers) {
      let account = new AccountApiModel();
      account.cardAccountNumber = cardNumber;
      itineraryApiModel.primaryAccountNumbers.push(account);
    }
    itineraryApiModel.destinations = [new DestinationApiModel(itinerary.state, itinerary.country)];
    return itineraryApiModel;
  }

}
