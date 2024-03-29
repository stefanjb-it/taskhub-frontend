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
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {combineLatestWith} from "rxjs";
import {SimpleInputFieldComponent} from "../../components/simple-input-field/simple-input-field.component";
import {SimpleSelectFieldComponent} from "../../components/simple-select-field/simple-select-field.component";
import {DateInputfieldComponent} from "../../components/date-inputfield/date-inputfield.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent, ReactiveFormsModule,
    SimpleInputFieldComponent, SimpleSelectFieldComponent, DateInputfieldComponent, RouterLink],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  customers: Customer[] = [];
  selection : string | undefined | null;
  formGroup: FormGroup;
  order: Order | undefined;
  states: any[] = [{id: false, name: "No"}, {id: true, name: "Yes"}];

  constructor(public userService:UserService, public customerService:CustomerService,
              public orderService:OrderService, private route:ActivatedRoute, private router: Router,
              private snackbar: MatSnackBar) {
    this.formGroup = new FormGroup( {
      order_nr: new FormControl(''),
      title: new FormControl(''),
      order_date: new FormControl(''),
      customer: new FormControl(null),
      is_completed: new FormControl(null)
    })

  }

  ngOnInit() {
    this.selection = this.route.snapshot.paramMap.get('id');
    if (!this.selection) {
      this.customerService.getCustomers().subscribe((customers: Customer[]) => {
        this.customers = customers;
        this.states = [{id: false, name: "No"}, {id: true, name: "Yes"}];
      });
      this.states = [false, true]
      return;
    }
    this.orderService.getOrder(parseInt(this.selection)).pipe(
      combineLatestWith(
        this.customerService.getCustomers()
      )
    ).subscribe(([order, customers]) => {
      this.order = order;
      this.customers = customers

      this.formGroup.patchValue(order)
      this.formGroup.controls['customer'].setValue(order.customer?.id)
    }, error => {
      this.router.navigate(['order-overview'])
      }
    )
  }

  handleSubmit() {
    let result = this.formGroup.value;
    if (!result.order_date){
      result.order_date = new Date().toISOString();
    }
    if (this.selection) {
      this.orderService.changeOrder(parseInt(this.selection), result).subscribe(
        res => {
          this.router.navigate(['order-overview'])
        },
        err => {
          this.snackbar.open(err.error.message, "" , {duration: 2500, verticalPosition: "top",
            horizontalPosition: "right"})
        }
      );
    } else {
      if (!result.is_completed){
        delete result.is_completed;
      }

      this.orderService.createOrder(result).subscribe(
        res => {
          this.router.navigate(['order-overview'])
        },
        err => {
          this.snackbar.open(err.error.message, "" , {duration: 2500, verticalPosition: "top",
            horizontalPosition: "right"})
        }
      );
    }
  }
}
