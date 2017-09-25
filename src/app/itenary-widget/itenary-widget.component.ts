import { SmartDataService } from '../services/smart-data.service';
import { Itinerary } from '../models/itenary';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-itenary-widget',
  templateUrl: './itenary-widget.component.html',
  styleUrls: ['./itenary-widget.component.css']
})
export class ItenaryWidgetComponent implements OnInit {

  @Input() itinerary: Itinerary;
  @Output() onDeleteOrUpdateItinerary: EventEmitter<boolean> = new EventEmitter();

  private inEditMode: boolean = false;
  private inDeleteMode: boolean = false;
  private hasErrorOccuredDeleting: boolean = false;

  constructor(private smartDataService: SmartDataService) { }

  ngOnInit() {
  }


  onEditItinenary(): void {
    this.inEditMode = true;
  }


  onDeleteConfirm(): void {
    this.hasErrorOccuredDeleting = false;
    this.smartDataService.deleteItinenary(this.itinerary).finally(() => {
    }).subscribe(() => {
      this.inDeleteMode = false;
      this.smartDataService.getItinerariesByAccountNumber(this.itinerary);
      this.onDeleteOrUpdateItinerary.emit();
    }, (error) => {
      console.log(error);
      this.hasErrorOccuredDeleting = true;
    });
  }


  onDeleteCancel(): void {
    this.inDeleteMode = false;
  }


  onDeleteItinerary(): void {
    this.inDeleteMode = true;
  }


  onItineraryFormSaveOrCancel(event: any) {
    this.onDeleteOrUpdateItinerary.emit();
    this.inEditMode = event;
  }

}
