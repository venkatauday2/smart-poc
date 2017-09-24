import { Observable } from 'rxjs/Rx';
import { COUNTRIES, Country } from '../models/country';
import { Destination } from '../models/destination';
import { Itinerary } from '../models/itenary';
import { SmartDataService } from '../services/smart-data.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { State, STATES } from '../models/state'
import { Account } from '../models/account';

@Component({
  selector: 'app-add-update-itinerary-form',
  templateUrl: './add-update-itinerary-form.component.html',
  styleUrls: ['./add-update-itinerary-form.component.css']
})
export class AddUpdateItineraryFormComponent implements OnInit {

  @Output() eventShowItineraryForm: EventEmitter<boolean> = new EventEmitter();
  @Input() itinerary: Itinerary;

  itenaryForm: FormGroup;

  private states: State[] = [];
  private countries: Country[] = [];
  private accountNumbers: Account[] = [];
  private inEditMode: boolean;
  private isSavingData: boolean = false;
  private hasErrorOccured: boolean = false;

  constructor(private smartDataService: SmartDataService) {
    this.countries = COUNTRIES;
    this.states = STATES;
    this.accountNumbers = this.smartDataService.user.accounts;
  }

  ngOnInit() {

    if (this.itinerary.travelItineraryId == "0" || !this.itinerary.travelItineraryId) {
      this.inEditMode = false;
    }
    else {
      this.inEditMode = true;
    }
    this.onInitForm()
  }


  search = (text$: Observable<string>) => {
    return text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.states.filter(v => v.description.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)).map;
  }


  onInitForm() {

    let destinations = new FormArray([], Validators.compose([Validators.required, Validators.minLength(1)]));
    let travelItineraryId = null;
    let departureDate = null;
    let returnDate = null;
    let selectedCardNumber = this.itinerary.primaryAccountNumbers[0].cardAccountNumber;;

    if (this.inEditMode) {
      travelItineraryId = this.itinerary.travelItineraryId;
      departureDate = this.itinerary.departureDate;
      returnDate = this.itinerary.returnDate;

      if (this.itinerary.destinations.length > 0) {
        for (let destination of this.itinerary.destinations) {
          destinations.push(new FormGroup({
            'state': new FormControl(destination.state, [Validators.required]),
            'country': new FormControl(destination.country, [Validators.required])
          }));
        }
      }
    }
    else {
      travelItineraryId = (Math.floor(Math.random() * 1000000) + 1).toString()
    }

    this.itenaryForm = new FormGroup({
      'travelItineraryId': new FormControl(travelItineraryId, []),
      'departureDate': new FormControl(departureDate, [Validators.required]),
      'returnDate': new FormControl(returnDate, [Validators.required]),
      'destinations': destinations,
      'selectedCardNumber': new FormControl(selectedCardNumber, [Validators.required])
    });

  }

  private getCompleteCardNumber(lastFourCardNumber: string): string {
    for (let account of this.smartDataService.user.accounts) {
      if (account.cardAccountNumber.slice(12, 18) === lastFourCardNumber.slice(12, 18)) {
        return account.cardAccountNumber;
      }
    }
    return lastFourCardNumber;
  }

  showItenaryForm(shouldShow: boolean): void {
    this.eventShowItineraryForm.emit(shouldShow);
  }


  onAddDestination() {
    (<FormArray>this.itenaryForm.get('destinations')).push(new FormGroup({
      'state': new FormControl('', [Validators.required]),
      'country': new FormControl('', [Validators.required])
    }));
  }


  onDeleteDestination(i: any) {
    (<FormArray>this.itenaryForm.get('destinations')).removeAt(i);
  }


  onSubmit() {

    this.isSavingData = true;

    let formData = this.itenaryForm.value;
    formData.selectedCardNumbers = [];
    formData.selectedCardNumbers.push(this.itenaryForm.value.selectedCardNumber)

    if (!this.inEditMode) {
      this.smartDataService.addItinerary(formData).finally(() => {
        this.isSavingData = false;
      }).subscribe((data: any) => {
        this.smartDataService.loadItineraries();
        this.eventShowItineraryForm.emit(false);
      }, (error) => {
        console.log(error);
        this.hasErrorOccured = true;
      });
    }
    else {
      this.smartDataService.updateItinerary(formData).finally(() => {
        this.isSavingData = false;
      }).subscribe((data: any) => {
        this.smartDataService.loadItineraries();
        this.eventShowItineraryForm.emit(false);
      }, (error) => {
        console.log(error);
        this.hasErrorOccured = true;
      });

    }

  }


}
