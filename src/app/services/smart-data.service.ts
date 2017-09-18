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
   
    for(let cardNumber of itenary.cardNumbers)
    {
      itenaryModel.primaryAccountNumbers.push(new Account(cardNumber.toString(), false, false));
    }

    this.user.itenaries.push(itenaryModel);
  }


  private newFunction(cardNumber: any): Account {
    return new Account(cardNumber, false, false);
  }
}
