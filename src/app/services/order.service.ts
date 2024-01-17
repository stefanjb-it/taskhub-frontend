import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChangeOrder, Order} from "../models/Order";

const baseurl: string = "/api/orders"

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private http:HttpClient) { }

  getOrders() {
    return this.http.get<Order[]>(baseurl)
  }

  getOrder(id: number) {
    return this.http.get<Order>(baseurl + '/' + id)
  }

  createOrder(changeOrder: ChangeOrder) {
    return this.http.post(baseurl, changeOrder)
  }

  changeOrder(id: number, changeOrder: ChangeOrder) {
    return this.http.put(baseurl + '/' + id, changeOrder)
  }

  deleteOrder(id: number) {
    return this.http.delete(baseurl + "/" + id)
  }
}
