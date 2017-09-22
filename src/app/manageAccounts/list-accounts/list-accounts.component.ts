import { SmartDataService } from '../../services/smart-data.service';
import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account'

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: []
})
export class ListAccountsComponent implements OnInit {

  public accounts: Account[] = [];

  constructor(private smartDataService: SmartDataService) {

    this.accounts = this.smartDataService.user.accounts;

  }

  ngOnInit() {
  }

}
