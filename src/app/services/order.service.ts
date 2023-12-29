import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChangeOrder, Order} from "../models/Order";

const baseurl: string = "/api/orders/"

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private http:HttpClient) { }

  getOrders() {
    return this.http.get<Order[]>(baseurl)
  }

  getCustomer(id: number) {
    return this.http.get<Order>(baseurl + id + "/")
  }

  createCustomer(changeCustomer: ChangeOrder) {
    return this.http.post(baseurl, changeCustomer)
  }

  changeCustomer(id: number, changeCustomer: ChangeOrder) {
    return this.http.put(baseurl + id + "/", changeCustomer)
  }

  deleteCustomers(id: number) {
    return this.http.delete(baseurl + id + "/")
  }
}
