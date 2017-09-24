import { Itinerary } from '../models/itenary';
import { DataMapper } from '../mapper/dataMapper';
import { UpdateItenaryApiModel } from '../apiModels/updateItineraryApiModel';
import { AddItenaryApiModel } from '../apiModels/addItenaryApiModel';
import { CURRENT_USER, User } from '../models/user';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class SmartApiService {

  private itineraryApiUrl: string = environment.travelNotificationItineraryUrl;

  constructor(private http: Http, private dataMapper: DataMapper) { }

  public user: User;

  getUser(): Promise<User> {
    return Promise.resolve(CURRENT_USER);
  }

  getItineraries(data: any): Observable<Itinerary[]> {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.itineraryApiUrl + `?primaryAccountNumber=${data.retrieveTravelItinerary.primaryAccountNumber.cardAccountNumber}`, options).map((response: Response) => {
      let apiData = response.json();
      return this.dataMapper.mapApiDataToItineraryModel(apiData.retrieveTravelItineraryResponse.travelItineraries);
    });
  }

  addItinerary(data: AddItenaryApiModel): Observable<any> {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.itineraryApiUrl, JSON.stringify(data), options).map((response: Response) => response.json());
  }

  updateItinerary(data: UpdateItenaryApiModel): Observable<any> {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.itineraryApiUrl, JSON.stringify(data), options).map((response: Response) => response.json());
  }

  deleteItinerary(data: any): Observable<any> {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers, body: JSON.stringify(data) });
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.itineraryApiUrl, options).map((response: Response) => response.json());
  }

}
