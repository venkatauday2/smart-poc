import { SmartApiService } from './services/smart-api.service';
import { SmartDataService } from './services/smart-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(private smartDataService:SmartDataService) {
        this.smartDataService.loadUser();
  }
}
