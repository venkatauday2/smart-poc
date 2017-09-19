import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../../models/account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: []
})
export class AccountComponent implements OnInit {

  @Input() account:Account;
  @Input() cardName:number;

  constructor() { }

  ngOnInit() {
  }

}
