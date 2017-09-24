import { Itinerary } from '../models/itenary';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-itenary-widget',
  templateUrl: './itenary-widget.component.html',
  styleUrls: ['./itenary-widget.component.css']
})
export class ItenaryWidgetComponent implements OnInit {

  @Input() itinerary: Itinerary;

  private inEditMode: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onEditItinenary(): void {
    this.inEditMode = true;
  }

  onDeleteItinerary(): void {

  }

  onItineraryFormSaveOrCancel(event: any) {
    this.inEditMode = event;
  }

}
