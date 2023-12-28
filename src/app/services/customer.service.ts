import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChangeCustomer, Customer} from "../models/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getCustomers() {
    return this.http.get<Customer[]>("/api/customers/")
  }

  getCustomer(id: number){
    return this.http.get<Customer>("/api/customers/"+ id +"/")
  }

  createCustomer(customer: Customer) {
    return this.http.post("/api/customers/", customer)
  }

  changeCustomer(customer: ChangeCustomer, id: number) {
    return this.http.put("/api/customers/" + id + "/", customer)
  }

  deleteCustomer(id: number) {
    return this.http.delete("/api/customers/" + id + "/")
  }
}
