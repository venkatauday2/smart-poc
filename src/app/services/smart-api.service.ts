import { UpdateItenaryApiModel } from '../apiModels/updateItineraryApiModel';
import { AddItenaryApiModel } from '../apiModels/addItenaryApiModel';
import { CURRENT_USER, User } from '../models/user';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class SmartApiService {

  private itineraryApiUrl: string = environment.travelNotificationItineraryUrl;

  constructor(private http: Http) { }

  public user: User;

  getUser(): Promise<User> {
    return Promise.resolve(CURRENT_USER);
  }

  addItinerary(data: AddItenaryApiModel): Observable<any> {
    return this.http.post(this.itineraryApiUrl, JSON.stringify(data));
  }

  updateItinerary(data: UpdateItenaryApiModel): Observable<any> {
    return this.http.post(this.itineraryApiUrl, JSON.stringify(data));
  }

}
