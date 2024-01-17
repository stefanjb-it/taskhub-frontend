import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {UnobjectingPipe} from "../../pipes/unobjecting.pipe";
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Customer} from "../../models/Customer";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-customer-overview',
  standalone: true,
  imports: [CommonModule, ButtonComponent, UnobjectingPipe, RouterLink],
  templateUrl: './customer-overview.component.html',
  styleUrl: './customer-overview.component.scss'
})
export class CustomerOverviewComponent {
  customers: Customer[] = [];

  constructor(public customerService: CustomerService, public userService: UserService) {
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  alert(key:string){
    alert(key)
  }
}
