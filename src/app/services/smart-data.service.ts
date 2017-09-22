import { DeleteItineraryRequest } from '../apiModels/deleteItineraryRequest';
import { UIFilter } from '../models/filter';
import { observable } from 'rxjs/symbol/observable';
import { DataMapper } from '../mapper/dataMapper';
import { Observable } from 'rxjs/Rx';
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
  public hasErrorOccuredLoadingItineraries: boolean = false;

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

    for (let account of this.user.accounts) {
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
      this.hasErrorOccuredLoadingItineraries = true;
      console.log(error);
    }, () => {
      this.isLoadingItineraries = false;
    })
  }


  public addItinerary(itinenary: any): Observable<any> {
    return this.smartApiService.addItinerary(this.dataMapper.buildAddItineraryApiModel(itinenary, this.user));
  }


  public updateItinerary(itinenary: any): Observable<any> {
    return this.smartApiService.updateItinerary(this.dataMapper.buildUpdateItineraryApiModel(itinenary, this.user));
  }


  public deleteItinenary(deleteItinenary: any) {
    return this.smartApiService.deleteItinerary(this.dataMapper.buildDeleteItineraryApiRequest(deleteItinenary));
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
