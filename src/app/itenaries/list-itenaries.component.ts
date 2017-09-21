import { UIFilter } from '../models/filter';
import { Itinerary } from '../models/itenary';
import { SmartDataService } from '../services/smart-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-itenaries',
  templateUrl: './list-itenaries.component.html',
  styleUrls: []
})
export class ListItenariesComponent implements OnInit {

  public shouldShowItenaryForm: boolean = false;
  public selectedItinenary: Itinerary;
  public itineraries: Itinerary[];


  constructor(private smartDataService: SmartDataService) {
  }

  ngOnInit() {
    this.smartDataService.loadUser();
    this.smartDataService.loadItineraries();
  }


  public addItinenary() {
    this.selectedItinenary = new Itinerary();
    this.shouldShowItenaryForm = true;
  }

  public showForm() {
    this.shouldShowItenaryForm = false;
  }

  public editItinenary(itinenary: any) {
    this.selectedItinenary = itinenary;
    this.shouldShowItenaryForm = true;
  }

  public onDelete(itinerary: any) {
    this.smartDataService.deleteItinenary(itinerary).subscribe((data: any) => {
      this.smartDataService.loadItineraries();
    }, (error) => {
      console.log(error);
    }, () => { });;

  }

}
