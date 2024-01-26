import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChangeCustomer, Customer} from "../models/Customer";

const baseurl: string = "/api/customers"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getCustomers() {
    return this.http.get<Customer[]>(baseurl)
  }

  getCustomer(id: number){
    return this.http.get<Customer>(baseurl + '/' + id)
  }

  createCustomer(customer: ChangeCustomer) {
    return this.http.post<Customer>(baseurl, customer)
  }

  changeCustomer(customer: ChangeCustomer, id: number) {
    return this.http.put(baseurl + '/' + id, customer)
  }

  deleteCustomer(id: number) {
    return this.http.delete(baseurl + '/' + id)
  }
}
