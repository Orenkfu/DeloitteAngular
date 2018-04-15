import { CustomerService } from '../customer.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pager } from '../models/pager';

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @Input('pager')  pager : Pager;
  @Input('pageAmountRange') pageAmountRange: number[];
  @Output() click = new EventEmitter();
  paginationError: string;

  constructor(private service: CustomerService) { }

  currentPage(currentPage): boolean{
 return  (currentPage == this.pager.page);
  }

  goToPage(page: number){
if (this.validatePage(page)){
  this.pager.page = page;
  this.click.emit();
  this.paginationError = "";
}else{
  this.paginationError = "This page is empty.";
}
  }
  nextPage() {
    this.pager.page++;
    if(this.validatePage(this.pager.page)){
      this.click.emit();
      this.paginationError = "";
    }
    else{
      this.pager.page--;
      this.paginationError = "Last page reached."
    }
    
  }
  previousPage() {
    this.pager.page--;
    if(this.validatePage(this.pager.page)){
      this.click.emit();
      this.paginationError = "";
    }
      
    else{
      this.pager.page++;
      this.paginationError = "First page reached.";
    }
  }

validatePage(page: number): boolean{
  if (page>= this.pageAmountRange.length) return false;
    else if(page<0) return false;
      else return true;
}

  ngOnInit() {
console.log(this.pageAmountRange);

  }

}
