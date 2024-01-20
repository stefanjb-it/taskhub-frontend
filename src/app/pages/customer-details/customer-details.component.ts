import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {ChangeCustomer} from "../../models/Customer";
import {UserService} from "../../services/user.service";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent {
  newCustomer : ChangeCustomer = {
    name: '',
    address: '',
    phone: '',
    is_company: false
  }

  constructor(public userService:UserService, public customerService:CustomerService) {
  }

  getName($event: string) {
    this.newCustomer.name = $event;
  }

  getAddress($event: string) {
    this.newCustomer.address = $event;
  }

  getPhone($event: string) {
    this.newCustomer.phone = $event;
  }

  getStatus($event: string) {
    if($event == 'Yes') {
      this.newCustomer.is_company = true;
    } else {
      this.newCustomer.is_company = false;
    }
  }

  createOrEditOrder() {
    this.customerService.createCustomer(this.newCustomer).subscribe((customer: ChangeCustomer) => {
      console.log(customer);
    });
  }
}
