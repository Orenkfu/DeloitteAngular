import { StorageService } from './../storage.service';
import { Pager } from './../models/pager';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy{

  ngOnDestroy(): void {
    this.storage.setPager(this.pager);
  }
  customers: Customer[];
  pager: Pager={"page": 0, "size": 10};
 // pageAmount: number;
  pageAmountRange: any[] = [];

  constructor(private customerService: CustomerService,
              private storage: StorageService
  ) { }
  
  getCustomers(){
    this.customerService.getAll(this.pager).subscribe(customers => {
      this.customers = customers;
    });
  }
  
  pageEvent(){
    this.getCustomers();
  }
  
  getPageAmount(){
    this.customerService.getTotalPages(this.pager.size).subscribe(
      amount=>{
        this.pageAmountRange=[];
        for (let index = 0; index < amount; index++) {
          this.pageAmountRange.push(index);
          
        }
      });
    }
    
    delete(customer){
      if (!confirm('Are you sure you want to delete this customer?')) return;
      
      this.customerService.delete(customer.id).subscribe(r=>{
        let i = this.customers.indexOf(customer);
        this.customers.splice(i, 1);
      }, null, ()=>{
        this.getCustomers();
        this.getPageAmount();   
      });
    
    }
    
    ngOnInit() {
       let pager = this.storage.getPager();
       console.log(pager)
       if (pager) this.pager = pager;
      
      this.getCustomers();
      this.getPageAmount();
    }
    
    trackByFn(index, customer){
      return customer ? customer.id : undefined;
    }
  }
