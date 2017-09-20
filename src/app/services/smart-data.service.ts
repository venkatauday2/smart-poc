import { Observable } from 'rxjs/Rx';
import { UpdateItenaryApiModel } from '../apiModels/updateItineraryApiModel';
import { DestinationApiModel } from '../apiModels/destinationApiModel';
import { AccountApiModel } from '../apiModels/accountApiModel';
import { ItinenaryApiModel } from '../apiModels/itineraryApiModel';
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
    itenaryModel.destinations = itenary.destinations
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
    itenaryModel.destinations = itenary.destinations
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


  public deleteItinenary(deleteItinenary: any) {

    let index = 0;
    for (let itinenary of this.user.itenaries) {

      if (itinenary.travelItineraryId === deleteItinenary.travelItineraryId) {
        this.user.itenaries.splice(index, 1)
      }
      index += 1;
    }

  }


  public addItinerary(itinenary: any): Observable<any> {
    return this.smartApiService.addItinerary(this.buildAddItineraryApiModel(itinenary));
  }

  public updateItinerary(itinenary: any): Observable<any> {
    return this.smartApiService.updateItinerary(this.buildUpdateItineraryApiModel(itinenary));
  }

  private buildAddItineraryApiModel(itinenary: any): AddItenaryApiModel {
    let addItineraryApiModel = new AddItenaryApiModel();
    addItineraryApiModel.userId = this.user.userId
    addItineraryApiModel.partnerBid = this.user.partnerBid
    addItineraryApiModel.addTravelItinerary = this.buildItineraryApiModel(itinenary)
    return addItineraryApiModel;
  }


  private buildUpdateItineraryApiModel(itinenary: any): UpdateItenaryApiModel {
    let updateItineraryApiModel = new UpdateItenaryApiModel();
    updateItineraryApiModel.userId = this.user.userId
    updateItineraryApiModel.partnerBid = this.user.partnerBid
    updateItineraryApiModel.updateTravelItinerary = this.buildItineraryApiModel(itinenary);
    updateItineraryApiModel.travelItineraryId = itinenary.travelItineraryId;
    return updateItineraryApiModel;
  }


  private buildItineraryApiModel(itinerary: any): ItinenaryApiModel {
    let itinenaryApiModel = new ItinenaryApiModel();
    itinenaryApiModel.departureDate = itinerary.departureDate;
    itinenaryApiModel.returnDate = itinerary.returnDate;
    itinenaryApiModel.primaryAccountNumbers = [];
    itinenaryApiModel.destinations = [];

    // add accounts
    for (let cardNumber of itinerary.cardNumbers) {
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

}
