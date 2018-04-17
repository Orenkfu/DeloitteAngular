import { StorageService } from './../storage.service';
import { Pager } from './../models/pager';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../customer.service';

//TODO: Create a more elegant solution for pagination, using Routing, map, and switchMap opreators. 
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[];
  pager: Pager={"page": 0, "size": 10};
  pageAmount: number;
  pageAmountRange: any[] = [];
  
  constructor(private customerService: CustomerService,
              private storage: StorageService) { }
  
  getCustomers(){
    this.customerService.getAll(this.pager).subscribe(customers => {
      this.customers = customers;
    });
  }
  
  pageEvent(){
    this.getCustomers();
  }

  getPageAmount(){
  return  this.customerService.getTotalPages(this.pager.size);
  }

  loadPage(){
    this.getPageAmount().subscribe(
      amount=>{
        this.pageAmount= amount;
        this.pageAmountRange=[];
        for (let index = 0; index < amount; index++) {
          this.pageAmountRange.push(index);   
        }
      }, null, () =>{
        this.getRecentPage();
        this.getCustomers();
         }); 
      } 
      
    // TODO: Fix loading page amount when deleting customer.
    delete(customer){
      if (!confirm('Are you sure you want to delete this customer?')) return;
      
      this.customerService.delete(customer.id).subscribe(r=>{
        let i = this.customers.indexOf(customer);
        this.customers.splice(i, 1);
      }, null, ()=>{
            this.getCustomers();
          }); 
    }

  getRecentPage() {
    let pager = this.storage.getPager();
    if (pager) {
      if (pager.page > this.pageAmount)
        this.pager.page = this.pageAmount;
      else
        this.pager = pager;
    }
  }
    
    ngOnInit() {
      this.loadPage();
    }
    

    
    trackByFn(index, customer){
      return customer ? customer.id : undefined;
    }
  }
