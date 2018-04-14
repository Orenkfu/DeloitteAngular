import { Injectable } from '@angular/core';
import { Customer } from './models/customer';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable';


@Injectable()
export class CustomerService {
private url: string = "http://localhost:8080/api/customer";
  constructor(private http: Http) { }
create(customer: Customer){
  return this.http.post(this.url, customer);
}

update(customer: Customer){
  return this.http.put(this.url, customer);
}

get(id: number){
  return this.http.get(this.url + "/" + id);
}

delete(id: number){
  return this.http.delete(this.url + "/" + id);
}

getAll(){
  return this.http.get(this.url);
}

}
