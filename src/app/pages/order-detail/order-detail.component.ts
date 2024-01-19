import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {Order} from "../../models/Order";
import {Customer} from "../../models/Customer";
import {UserService} from "../../services/user.service";
import {OrderService} from "../../services/order.service";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-order-detail',
  standalone: true,
    imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {
  newOrder : Order = {
    id: 0,
    order_nr: 12345,
    title: '',
    order_date: '',
    customer: {id: 0, name: '', address: '', phone: '', is_company: false},
    is_completed: false
  }
  customers: Customer[] = [];
  constructor(public userService:UserService, public customerService:CustomerService,
              public orderService:OrderService) {

  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
  }

  getOrderNumber($event: string) {
    this.newOrder.order_nr = parseInt($event);
  }

  getTitle($event: string) {
    this.newOrder.title = $event;
  }

  getDate($event: string) {
    this.newOrder.order_date = $event;
  }

  getCustomer($event: string) {
    this.customerService.getCustomer(parseInt($event)).subscribe((customer: Customer) => {
      this.newOrder.customer = customer;
    });
  }

  getStatus($event: string) {
    if ($event == 'Yes') {
      this.newOrder.is_completed = true;
    } else {
      this.newOrder.is_completed = false;
    }
  }

  createOrEditOrder() {
    console.log(this.newOrder);
  }
}
