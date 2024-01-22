import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {ChangeCustomer} from "../../models/Customer";
import {UserService} from "../../services/user.service";
import {CustomerService} from "../../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent  implements OnInit {
  newCustomer : ChangeCustomer = {}
  selection : string | undefined | null;

  constructor(public userService:UserService, public customerService:CustomerService,
              private route:ActivatedRoute, private router: Router) {

  }

  ngOnInit(){
    this.selection = this.route.snapshot.paramMap.get('id');
    if (this.selection) {
      this.customerService.getCustomer(parseInt(this.selection)).subscribe(customer => {
        this.newCustomer.name = customer.name
        this.newCustomer.address = customer.address
        this.newCustomer.phone = customer.phone
        this.newCustomer.is_company = customer.is_company
      });
    }
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
    if (this.selection) {
      this.customerService.changeCustomer(this.newCustomer, parseInt(this.selection)).subscribe( data => {
        console.log(data);
      })
    } else {
      this.customerService.createCustomer(this.newCustomer).subscribe((customer: ChangeCustomer) => {
        console.log(customer);
      });
    }
    this.router.navigate(['customer-overview'])
  }
}
