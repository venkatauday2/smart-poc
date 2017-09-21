import { DataMapper } from './mapper/dataMapper';
import { SmartDataService } from './services/smart-data.service';
import { SmartApiService } from './services/smart-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';
import { TabsModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

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
    HttpModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    SmartApiService,
    DataMapper,
    SmartDataService]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
