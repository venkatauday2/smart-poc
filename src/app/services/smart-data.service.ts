import { DeleteItineraryRequest } from '../apiModels/deleteItineraryRequest';
import { UIFilter } from '../models/filter';
import { observable } from 'rxjs/symbol/observable';
import { DataMapper } from '../mapper/dataMapper';
import { Observable } from 'rxjs/Rx';
import { UpdateItenaryApiModel } from '../apiModels/updateItineraryApiModel';
import { DestinationApiModel } from '../apiModels/destinationApiModel';
import { AccountApiModel } from '../apiModels/accountApiModel';
import { ItinenaryApiModel } from '../apiModels/itineraryApiModel';
import { AddItenaryApiModel } from '../apiModels/addItenaryApiModel';
import { Account } from '../models/account';
import { Destination } from '../models/destination';
import { Itinerary } from '../models/itenary';

import { User } from '../models/user';
import { SmartApiService } from './smart-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SmartDataService {

  public user: User;
  public isloadingUserInfo: boolean = false;
  public itineraries: Itinerary[] = [];
  public isLoadingItineraries: boolean = false;
  public userAccountNumbers: string[] = [];
  public filter: UIFilter;

  constructor(private smartApiService: SmartApiService, private dataMapper: DataMapper) {
    this.filter = new UIFilter();
    this.filter.fromDate = "2017-03-01"
    this.filter.toDate = "2017-12-01"
    this.filter.partnerBid = "";
    this.filter.primaryAccountNumber = "All";
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


  public getItineraries(data: any): Observable<Itinerary[]> {

    let observables: Observable<Itinerary[]>[] = [];
    data.partnerBid = this.user.partnerBid;

    for (let account of this.user.accountNumbers) {
      observables.push(this.smartApiService.getItineraries(this.dataMapper.buildGetItineraryApiModel(data, account.cardAccountNumber)));
    }
    return Observable.forkJoin(observables).map((results) => {
      let itineraries: Itinerary[] = []
      for (let result of results) {
        for (let r of <Itinerary[]>result) {
          itineraries.push(r)
        }
      }
      return itineraries;
    });
  }



  public loadItineraries(): void {
    this.isLoadingItineraries = true;
    this.getItineraries(this.filter).subscribe((response) => {
      this.itineraries = response as Itinerary[];
    }, (error) => {
      console.log(error);
    }, () => {
      this.isLoadingItineraries = false;
    })
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


  public deleteItinenary(deleteItinenary: any) {
    let requestBody = new DeleteItineraryRequest();
    requestBody.deleteTravelItinerary = {
      travelItineraryId: deleteItinenary.travelItineraryId
    }
    return this.smartApiService.deleteItinerary(requestBody)
  }



  // public addUserItenary(itenary: any) {

  //   var itenaryModel = new Itinerary();
  //   itenaryModel.returnDate = itenary.returnDate;
  //   itenaryModel.departureDate = itenary.departureDate;
  //   itenaryModel.destinations = itenary.destinations
  //   itenaryModel.primaryAccountNumbers = [];
  //   itenaryModel.travelItineraryId = itenary.travelItineraryId;

  //   for (let cardNumber of itenary.selectedCardNumbers) {
  //     itenaryModel.primaryAccountNumbers.push(new Account(cardNumber.toString()));
  //   }

  //   this.user.itenaries.push(itenaryModel);
  // }


  // public updateUserItenary(itenary: any) {

  //   var itenaryModel = this.findItineraryById(itenary.travelItineraryId);
  //   itenaryModel.returnDate = itenary.returnDate;
  //   itenaryModel.departureDate = itenary.departureDate;
  //   itenaryModel.destinations = itenary.destinations
  //   itenaryModel.primaryAccountNumbers = [];
  //   itenaryModel.travelItineraryId = itenary.travelItineraryId;

  //   for (let cardNumber of itenary.selectedCardNumbers) {
  //     itenaryModel.primaryAccountNumbers.push(new Account(cardNumber.toString()));
  //   }
  // }

  // private findItineraryById(id: string): Itinerary {

  //   for (let itinenary of this.user.itenaries) {
  //     if (itinenary.travelItineraryId === id)
  //       return itinenary;
  //   }
  //   return null;

  // }




}
