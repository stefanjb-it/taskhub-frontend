import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {UnvehicletypePipe} from "../../pipes/unvehicletype.pipe";
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Order} from "../../models/Order";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-order-overview',
  standalone: true,
  imports: [CommonModule, ButtonComponent, UnvehicletypePipe, RouterLink],
  templateUrl: './order-overview.component.html',
  styleUrl: './order-overview.component.scss'
})
export class OrderOverviewComponent implements OnInit {
  orders: Order[] = [];

  constructor(public orderService: OrderService, public userService: UserService) {
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  alert(key:string){
    alert(key)
  }
}
