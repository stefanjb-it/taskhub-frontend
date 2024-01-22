import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {ChangeOrder, Order} from "../../models/Order";
import {Customer} from "../../models/Customer";
import {UserService} from "../../services/user.service";
import {OrderService} from "../../services/order.service";
import {CustomerService} from "../../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {cibTopcoder} from "@coreui/icons";

@Component({
  selector: 'app-order-detail',
  standalone: true,
    imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  newOrder : ChangeOrder = {}
  customers: Customer[] = [];
  selection : string | undefined | null;
  constructor(public userService:UserService, public customerService:CustomerService,
              public orderService:OrderService, private route:ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
    this.selection = this.route.snapshot.paramMap.get('id');
    if (this.selection) {
      this.orderService.getOrder(parseInt(this.selection)).subscribe(order => {
        this.newOrder.title = order.title
        this.newOrder.order_nr = order.order_nr
        this.newOrder.order_date = order.order_date.length > 10 ? order.order_date.substring(0, 10) : order.order_date
        this.newOrder.customer = order.customer.id
        this.newOrder.is_completed = order.is_completed
      })
    }
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

  getStatusId(isCompleted:boolean) : number {
    if (isCompleted) {
      return 1
    } else {
      return 0
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
    if (this.selection) {
      this.orderService.changeOrder(parseInt(this.selection), this.newOrder).subscribe(
        res => {
          alert('Order updated successfully!')
          this.router.navigate(['order-overview'])
        },
        err => {
          alert(err.header)
        }
      );
    } else {
      this.orderService.createOrder(this.newOrder).subscribe(
        res => {
          alert('Order created successfully!')
          this.router.navigate(['order-overview'])
        },
        err => {
          alert(err.header)
        });
    }
  }

}
