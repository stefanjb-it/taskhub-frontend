import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatStepperModule} from "@angular/material/stepper";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {DateInputfieldComponent} from "../../components/date-inputfield/date-inputfield.component";
import {CustomerService} from "../../services/customer.service";
import {OrderService} from "../../services/order.service";
import {ChangeCustomer} from "../../models/Customer";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ButtonComponent} from "../../components/button/button.component";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";

@Component({
  selector: 'app-stepper-order',
  standalone: true,
  imports: [CommonModule, MatStepperModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    SelectfieldComponent, InputfieldComponent, DateInputfieldComponent, ButtonComponent],
  templateUrl: './stepper-order.component.html',
  styleUrl: './stepper-order.component.scss',
  providers:[
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ]
})
export class StepperOrderComponent {
  customer: ChangeCustomer = {};
  is_companyList = [{id:false, name:'No'}, {id:true, name:'Yes'}];
  states: any[] = [{id: false, name: "No"}, {id: true, name: "Yes"}];

  customerFormGroup: FormGroup;
  orderFormGroup: FormGroup;

  constructor(private customerService: CustomerService, private orderService: OrderService, private router: Router,
              private snackbar: MatSnackBar) {
    this.customerFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.max(50)]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      is_company: new FormControl(null)
    });
    this.orderFormGroup = new FormGroup({
      order_nr: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      order_date: new FormControl(''),
      is_completed: new FormControl(null)
    });
  }

  createOrderAndCustomer() {
    this.customerService.createCustomer(this.customerFormGroup.value).subscribe(
      customer => {
        let order = this.orderFormGroup.value
        order.customer = customer.id

        if (!order.order_date){
          order.order_date = new Date().toISOString();
        }

        this.orderService.createOrder(order).subscribe(
          res => {
            this.router.navigate(['order-overview'])
          },
          err => {
            this.snackbar.open(err.error.message, "" , {duration: 2500, verticalPosition: "top",
              horizontalPosition: "right"})
            this.customerService.deleteCustomer(customer.id)
          }
        )
      },
      err => {
        this.snackbar.open(err.error.message, "" , {duration: 2500, verticalPosition: "top",
          horizontalPosition: "right"})
      }
    );
  }
}
