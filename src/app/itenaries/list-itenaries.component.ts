import { SmartDataService } from '../services/smart-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-itenaries',
  templateUrl: './list-itenaries.component.html',
  styleUrls: []
})
export class ListItenariesComponent implements OnInit {

  public shouldShowItenaryForm: boolean = false;

  constructor(private smartDataService: SmartDataService) {

  }

  ngOnInit() {
    this.smartDataService.loadUser();
  }


  public showForm() {
    this.shouldShowItenaryForm = !this.shouldShowItenaryForm;
  }

}
