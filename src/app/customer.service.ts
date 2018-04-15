import { Injectable } from '@angular/core';
import { Customer } from './models/customer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Pager } from './models/pager';


@Injectable()
export class CustomerService {
private url: string = "http://localhost:8080/api/customer";
  constructor(private http: HttpClient) { }
create(customer: Customer){
  return this.http.post<Customer>(this.url, customer);
}

update(customer: Customer){
  return this.http.put(this.url, customer);
}

get(id: number){
  return this.http.get<Customer>(this.url + "/" + id);
}

delete(id: number){
  return this.http.delete(this.url + "/" + id);
}

getAll(pager: Pager) {
  let Params = new HttpParams();
 Params = Params.append('page', pager.page+'');
 Params = Params.append('size', pager.size+'');

  return this.http.get<Customer[]>(this.url, {params : Params});
}

getTotalPages(size: number){
  let Params = new HttpParams();
  Params = Params.append('size', size + '');
  return this.http.get<number>(this.url+"/pages", { params: Params });

}
getAllTest(pager: Pager) {
  let customers: Customer[]=  [];
  let id = 1;
  let i = pager.page * pager.size;
  for (let index = i; index <= pager.size; index++) {
    customers.push({"id": id++, "name": "string", "address": "string", "phoneNumber": "string"})  
  }
  return customers;
}

}
