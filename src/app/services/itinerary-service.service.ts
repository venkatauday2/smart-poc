import { Injectable } from '@angular/core';

@Injectable()
export class ItineraryServiceService {

  constructor() { }




  getItinerariesForAccount(accountNumber: string) {
    let itineraries = localStorage.getItem(`get-itineraries-${accountNumber}`)

  }


  addItinerary(accountNumber: string, itinerary: any) {

  }


  updateItinerary(accountNumber: string, itinerary: any) {

  }

  
  deleteItinerary(itineraryId: string, accountNumber: string) {

  }


}
