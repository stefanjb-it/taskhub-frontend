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
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {combineLatestWith} from "rxjs";
import {SimpleInputFieldComponent} from "../../components/simple-input-field/simple-input-field.component";
import {SimpleSelectFieldComponent} from "../../components/simple-select-field/simple-select-field.component";

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent, ReactiveFormsModule, SimpleInputFieldComponent, SimpleSelectFieldComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  newOrder : ChangeOrder = {}
  customers: Customer[] = [];
  selection : string | undefined | null;
  formGroup: FormGroup;
  order: Order | undefined;
  states: any[] = [
    {
      id: "false",
      name: "No"
    },
    {
      id: "true",
      name: "Yes"
    }
  ];

  constructor(public userService:UserService, public customerService:CustomerService,
              public orderService:OrderService, private route:ActivatedRoute, private router: Router) {
    this.formGroup = new FormGroup( {
      order_nr: new FormControl(''),
      title: new FormControl(''),
      order_date: new FormControl(''),
      customer: new FormControl(null),
      is_completed: new FormControl(null)
    })
    this.formGroup.valueChanges.subscribe((value) => {
      //console.log(value)
    });
  }

  ngOnInit() {
    this.selection = this.route.snapshot.paramMap.get('id');
    if (!this.selection) {
      this.customerService.getCustomers().subscribe((customers: Customer[]) => {
        this.customers = customers;
        this.states = [
          {
            id: "false",
            name: "No"
          },
          {
            id: "true",
            name: "Yes"
          }
        ]
      });
      this.states = [false, true]
      return;
    }
    this.orderService.getOrder(parseInt(this.selection)).pipe(
      combineLatestWith(
        this.customerService.getCustomers()
      )
    ).subscribe(([order, customers]) => {
      //console.log(order, customers)
      this.order = order;
      this.customers = customers

      this.formGroup.patchValue(order)
      this.formGroup.controls['customer'].setValue(order.customer?.id)
      this.formGroup.controls['is_completed'].setValue(order.is_completed)
    })
  }

  toName(input: Customer):string | null {
    if (input == undefined) {
      return null;
    }
    return input.name;
  }

  handleSubmit() {
    this.newOrder = this.formGroup.value;
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
