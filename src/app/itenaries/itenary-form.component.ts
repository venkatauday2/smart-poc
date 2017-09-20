import { COUNTRIES, Country } from '../models/country';
import { Destination } from '../models/destination';
import { Itenary } from '../models/itenary';
import { SmartDataService } from '../services/smart-data.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { State, STATES } from '../models/state'
import { Account } from '../models/account';

@Component({
    selector: 'itenary-form',
    templateUrl: './itenary-form.component.html',
    styleUrls: []
})
export class ItenaryFormComponent implements OnInit {

    @Output() eventShowItenaryForm: EventEmitter<boolean> = new EventEmitter();
    @Input() itinenary: Itenary;

    itenaryForm: FormGroup;

    private states: State[] = [];
    private countries: Country[] = [];
    private accountNumbers: Account[] = [];
    private inEditMode: boolean;
    private selectedCardNumbers: string[] = [];


    constructor(private smartDataService: SmartDataService) {
        this.countries = COUNTRIES;
        this.states = STATES;
        this.accountNumbers = this.smartDataService.user.accountNumbers;
    }

    ngOnInit() {

        if (this.itinenary.travelItineraryId == "0" || !this.itinenary.travelItineraryId) {
            this.inEditMode = false;
        }
        else {
            this.inEditMode = true;
            for (let card of this.itinenary.primaryAccountNumbers) {
                this.selectedCardNumbers.push(card.cardAccountNumber);
            }
        }
        this.onInitForm()
    }


    onInitForm() {

        let destinations = new FormArray([], Validators.compose([Validators.required, Validators.minLength(1)]));
        let travelItineraryId = null;
        let departureDate = null;
        let returnDate = null;
        let selectedCardNumbers = this.selectedCardNumbers;

        if (this.inEditMode) {
            travelItineraryId = this.itinenary.travelItineraryId;
            departureDate = this.itinenary.departureDate;
            returnDate = this.itinenary.returnDate;

            if (this.itinenary.destinations.length > 0) {
                for (let destination of this.itinenary.destinations) {
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
            'selectedCardNumbers': new FormControl(selectedCardNumbers, [Validators.required])
        });

    }


    showItenaryForm(shouldShow: boolean): void {
        this.eventShowItenaryForm.emit(shouldShow);
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
        if (!this.inEditMode) {
            this.smartDataService.addUserItenary(this.itenaryForm.value);
        }
        else {
            this.smartDataService.updateUserItenary(this.itenaryForm.value);
        }
        this.eventShowItenaryForm.emit(false);
    }


}