import { Destination } from '../models/destination';
import { Itenary } from '../models/itenary';
import { SmartDataService } from '../services/smart-data.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
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
    private accountNumbers: Account[] = [];
    private shouldPerformUpdate: boolean;
    private selectedCardNumbers: string[] = [];


    constructor(private smartDataService: SmartDataService) {
        this.states = STATES;
        this.accountNumbers = this.smartDataService.user.accountNumbers;
        this.itenaryForm = new FormGroup({
            'travelItineraryId': new FormControl('', []),
            'departureDate': new FormControl('', [Validators.required]),
            'returnDate': new FormControl('', [Validators.required]),
            'state': new FormControl('', [Validators.required]),
            'country': new FormControl('USA', [Validators.required]),
            'selectedCardNumbers': new FormControl('', [Validators.required])
        });

    }

    ngOnInit() {

        if (this.itinenary.travelItineraryId == "0" || !this.itinenary.travelItineraryId) {

            this.shouldPerformUpdate = false;
            this.itinenary = new Itenary();
            this.itinenary.travelItineraryId = (Math.floor(Math.random() * 1000000) + 1).toString();
            this.itinenary.destinations.push(new Destination("", "USA"));
        }
        else {
            this.shouldPerformUpdate = true;
            for (let card of this.itinenary.primaryAccountNumbers) {
                this.selectedCardNumbers.push(card.cardAccountNumber);
            }
        }
    }


    showItenaryForm(shouldShow: boolean): void {
        this.eventShowItenaryForm.emit(shouldShow);
    }

    onSubmit() {
        if (!this.shouldPerformUpdate) {
            this.smartDataService.addUserItenary(this.itenaryForm.value);
        }
        else {
            this.smartDataService.updateUserItenary(this.itenaryForm.value);
        }
        this.eventShowItenaryForm.emit(false);
    }


}