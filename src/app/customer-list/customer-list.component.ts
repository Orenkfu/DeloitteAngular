import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit{

  customers: Customer[];

  constructor(private customerService: CustomerService) { }
  
  getCustomers(){
    //this.customers = this.fake;
    return this.customerService.getAll();
  }
  
  delete(customer){
    if (!confirm('Are you sure you want to delete this customer?')) return;

    this.customerService.delete(customer.id).subscribe(r=>{
    let i = this.customers.indexOf(customer);
    this.customers.splice(i, 1);
  });
}

  ngOnInit() {
  this.getCustomers().subscribe(response => {
      this.customers = response.json();
    });
  }
  
}
