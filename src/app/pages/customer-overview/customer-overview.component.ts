import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {UnobjectingPipe} from "../../pipes/unobjecting.pipe";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Customer} from "../../models/Customer";
import {CustomerService} from "../../services/customer.service";
import {Employee} from "../../models/Employee";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-customer-overview',
  standalone: true,
  imports: [CommonModule, ButtonComponent, UnobjectingPipe, RouterLink, ReactiveFormsModule],
  templateUrl: './customer-overview.component.html',
  styleUrl: './customer-overview.component.scss'
})
export class CustomerOverviewComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];

  filterFormControl = new FormControl('')

  constructor(public customerService: CustomerService, public userService: UserService, public route:Router) {
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      this.filteredCustomers = customers;
    });
    this.filterFormControl.valueChanges.subscribe(value => {
      this.filterCustomers(value)
    })
  }

  filterCustomers(filterValue: string | null){
    this.filteredCustomers = this.customers.filter( customer => {
      return !filterValue || customer.name.toLowerCase().includes(filterValue.toLowerCase())
    })
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(
        res => {
          alert('customer deleted successfully!');
          this.filteredCustomers = this.filteredCustomers.filter(customer => customer.id != id)
        },
        err => alert('Error occured!')
    );
  }
}
