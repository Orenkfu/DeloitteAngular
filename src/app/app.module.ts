import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppErrorHandler } from './models/app-error-handler';
import { ErrorHandler } from '@angular/core';
import { CustomerService } from './customer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { HomeComponent } from './home/home.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { PagerComponent } from './pager/pager.component';
import { StorageService } from './storage.service';

const routes = [
  {path: "new-customer", component: CustomerFormComponent}, 
  {path: "customers/:id", component: CustomerFormComponent},
  {path: "customers", component: CustomerListComponent},
  {path: "", component: HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CustomerFormComponent,
    CustomerListComponent,
    HomeComponent,
    BsNavbarComponent,
    PagerComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    CustomerService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
