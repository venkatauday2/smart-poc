import { Itenary } from '../models/itenary';
import { SmartDataService } from '../services/smart-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-itenaries',
  templateUrl: './list-itenaries.component.html',
  styleUrls: []
})
export class ListItenariesComponent implements OnInit {

  public shouldShowItenaryForm: boolean = false;
  public selectedItinenary: Itenary;

  constructor(private smartDataService: SmartDataService) {

  }

  ngOnInit() {
    this.smartDataService.loadUser();
  }


  public addItinenary() {
    this.selectedItinenary = new Itenary();
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
    this.smartDataService.deleteItinenary(itinerary);

  }

}
