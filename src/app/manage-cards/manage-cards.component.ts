import { SmartDataService } from '../services/smart-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.css']
})
export class ManageCardsComponent implements OnInit {

  constructor(private smartDataService: SmartDataService) {

  }

  ngOnInit() {
  }

}
