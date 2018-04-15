import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../models/customer';

@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit{
  customer: Customer = {"id": null,"name": "", "address": "", "phoneNumber":""};
  id;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  save(){
    this.customerService.create(this.customer).subscribe(
      response=> this.navigateToList()
      );
  }

  update(){
    this.customerService
    .update(this.customer).subscribe(
        response => this.navigateToList())
  
  }

  navigateToList(){
this.router.navigate(['/customers'])
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.customerService.get(this.id).subscribe(c=>{
        this.customer = c;
      });

      }
    }
  }
  


