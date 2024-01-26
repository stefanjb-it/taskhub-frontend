import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {UnvehicletypePipe} from "../../pipes/unvehicletype.pipe";
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Order} from "../../models/Order";
import {OrderService} from "../../services/order.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";

@Component({
  selector: 'app-order-overview',
  standalone: true,
  imports: [CommonModule, ButtonComponent, UnvehicletypePipe, RouterLink, ReactiveFormsModule, MatButtonModule,
    MatCardModule, InputfieldComponent],
  templateUrl: './order-overview.component.html',
  styleUrl: './order-overview.component.scss'
})
export class OrderOverviewComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];

  filterFormControl = new FormControl('')

  constructor(public orderService: OrderService, public userService: UserService, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      this.filteredOrders = orders;
    });
    this.filterFormControl.valueChanges.subscribe(value => {
      this.filterOrders(value)
    })
  }

  filterOrders(filterValue: string | null){
    this.filteredOrders  = this.orders.filter( order => {
      return !filterValue ||  order.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        (order.is_completed ? "Finalized" : "Uncompleted").toLowerCase().includes(filterValue.toLowerCase())
    })
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe(
      res => {
        this.filteredOrders = this.filteredOrders.filter(order => order.id != id)
      },
      err => {
        this.snackbar.open(err.error.message, "" , {duration: 2500, verticalPosition: "top",
          horizontalPosition: "right"})
      }
    );
  }
}
