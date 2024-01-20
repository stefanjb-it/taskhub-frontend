import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {ChangeOrder, Order} from "../../models/Order";
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
  newOrder : ChangeOrder = {
    order_nr: undefined,
    title: undefined,
    customer: undefined,
    order_date: undefined,
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
    if ($event != '-1') {
      this.newOrder.customer = parseInt($event);
      console.log(this.newOrder.customer);
    }
  }

  getStatus($event: string) {
    if ($event == 'Yes') {
      this.newOrder.is_completed = true;
    } else {
      this.newOrder.is_completed = false;
    }
  }

  createOrEditOrder() {
    this.orderService.createOrder(this.newOrder).subscribe(order => {
      console.log(order);
    });
  }
}
