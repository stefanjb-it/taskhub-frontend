import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {ChangeCustomer} from "../../models/Customer";
import {UserService} from "../../services/user.service";
import {CustomerService} from "../../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SimpleInputFieldComponent} from "../../components/simple-input-field/simple-input-field.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SimpleSelectFieldComponent} from "../../components/simple-select-field/simple-select-field.component";

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent, SimpleInputFieldComponent, ReactiveFormsModule, SimpleSelectFieldComponent],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent  implements OnInit {
  newCustomer : ChangeCustomer = {}
  selection : string | undefined | null;

  formGroup: FormGroup;

  constructor(public userService:UserService, public customerService:CustomerService,
              private route:ActivatedRoute, private router: Router) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      is_company: new FormControl(null)
    });
  }

  ngOnInit(){
    this.selection = this.route.snapshot.paramMap.get('id');

    if(!this.selection) {
      return;
    }

    this.customerService.getCustomer(parseInt(this.selection)).subscribe(res => {
      console.log(res);
      this.formGroup.patchValue(res);
    })
  }


  handleSubmit() {
    this.newCustomer = this.formGroup.value;

    if(this.selection) {
      this.customerService.changeCustomer(this.newCustomer, parseInt(this.selection)).subscribe(
        res => {
        this.router.navigate(['customer-overview']);
        },
        err => {
          alert("Something went wrong, please check all values and try again!");
        }
      )
    } else {
      this.customerService.createCustomer(this.newCustomer).subscribe(
        res => {
        this.router.navigate(['customer-overview']);
        },
        err => {
          alert("Something went wrong, please check all values and try again!");
        }
      )
    }
  }
}
