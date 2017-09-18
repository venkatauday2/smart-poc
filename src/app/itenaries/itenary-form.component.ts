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


    itenaryForm: FormGroup;
    private states: State[] = [];
    private accountNumbers: Account[] = [];


    constructor(private smartDataService: SmartDataService) {
        this.states = STATES;
        this.accountNumbers = this.smartDataService.user.accountNumbers;
        this.itenaryForm = new FormGroup({
            'departureDate': new FormControl('', [Validators.required]),
            'returnDate': new FormControl('', [Validators.required]),
            'state': new FormControl('', [Validators.required]),
            'country': new FormControl('USA', [Validators.required]),
            'cardNumbers': new FormControl('', [Validators.required])
        });

    }

    ngOnInit() {

    }

    showItenaryForm(shouldShow: boolean): void {
        this.eventShowItenaryForm.emit(shouldShow);
    }

    onSubmit() {
        this.smartDataService.addUserItenary(this.itenaryForm.value);
        this.eventShowItenaryForm.emit(false);
    }


}