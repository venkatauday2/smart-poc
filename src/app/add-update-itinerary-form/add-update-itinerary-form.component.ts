import { Observable } from 'rxjs/Rx';
import { COUNTRIES, Country } from '../models/country';
import { Destination } from '../models/destination';
import { Itinerary } from '../models/itenary';
import { SmartDataService } from '../services/smart-data.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { State, STATES } from '../models/state'
import { Account } from '../models/account';
declare var jQuery: any;

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
  private $: any;


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

  ngAfterViewInit() {
    this.initializeTypeAhead();

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
            'state': new FormControl(destination.state.description, [Validators.required]),
            'country': new FormControl(destination.country.description, [Validators.required])
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
    this.initializeTypeAhead();
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




  private initializeTypeAhead(): void {
    var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda",
      "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
      "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil",
      "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia",
      "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo",
      "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus",
      "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
      "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands",
      "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia",
      "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea",
      "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran",
      "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya",
      "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
      "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania",
      "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia",
      "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway",
      "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
      "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino",
      "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
      "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan",
      "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este",
      "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine",
      "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen",
      "Zambia", "Zimbabwe"];


    let states: string[] = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
      'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
      'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
      'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
      'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
      'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
      'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
      'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    jQuery(document).ready(function () {
      jQuery(".typeahead").typeahead();

      jQuery("input[id^='state']").typeahead({
        source: states,
        autoSelect: true,
        minLength: 1
      });

      jQuery("input[id^='country']").typeahead({
        source: countries,
        autoSelect: true,
        minLength: 1
      });


    });

  }


}
