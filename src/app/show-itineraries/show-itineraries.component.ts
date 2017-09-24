import { UIFilter } from '../models/filter';
import { Itinerary } from '../models/itenary';
import { Account } from '../models/account';
import { SmartDataService } from '../services/smart-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-show-itineraries',
  templateUrl: './show-itineraries.component.html',
  styleUrls: ['./show-itineraries.component.css']
})
export class ShowItinerariesComponent implements OnInit {

  @Input() account: Account;

  private itineraries: Itinerary[] = [];
  private isLoadingItineraries: boolean = false;
  private filter: UIFilter;
  private newItinerary: Itinerary;
  private inAddMode: boolean = false;

  constructor(private smartDataService: SmartDataService) { }

  ngOnInit() {
    this.reloadItineraries();
  }


  reloadItineraries() {

    this.filter = new UIFilter();
    this.filter.fromDate = "2017-03-01"
    this.filter.toDate = "2017-12-01"
    this.filter.partnerBid = "";
    this.filter.primaryAccountNumber = this.account.cardAccountNumber;

    this.isLoadingItineraries = true;

    this.smartDataService.getItinerariesByAccountNumber(this.filter).finally(() => {
      this.isLoadingItineraries = false;
    }).subscribe((data) => {
      this.itineraries = data as Itinerary[]
    }, (error) => {
      console.log(error);
    });
  }


  onAddItinerary(): void {
    this.newItinerary = new Itinerary();
    this.newItinerary.primaryAccountNumbers.push(new Account(this.account.cardAccountNumber));
    this.inAddMode = true;
  }


  onItineraryFormSaveOrCancel($event): void {
    this.inAddMode = $event;
  }

}
