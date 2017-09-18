import { SmartDataService } from './services/smart-data.service';
import { SmartApiService } from './services/smart-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TabsModule } from 'ngx-bootstrap'

//import components
import { AppComponent } from './app.component';
import { ListItenariesComponent } from './itenaries/list-itenaries.component'
import { ItenaryFormComponent } from './itenaries/itenary-form.component';
import { ListAccountsComponent } from './manageAccounts/list-accounts/list-accounts.component';
import { AccountComponent } from './manageAccounts/account/account.component'
//import { DropdownMultiselectModule } from 'ng2-dropdown-multiselect';

@NgModule({
  declarations: [
    AppComponent,
    ListItenariesComponent,
    ItenaryFormComponent,
    ListAccountsComponent,
    AccountComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot()
    //DropdownMultiselectModule
  ],
  providers: [
    SmartApiService,
    SmartDataService]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
