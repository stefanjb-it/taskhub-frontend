import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {UserService} from "../../services/user.service";
import {CustomerService} from "../../services/customer.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SimpleInputFieldComponent} from "../../components/simple-input-field/simple-input-field.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SimpleSelectFieldComponent} from "../../components/simple-select-field/simple-select-field.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent, SimpleInputFieldComponent,
    ReactiveFormsModule, SimpleSelectFieldComponent, MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule,
    MatButtonModule, MatSelectModule, RouterLink],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent  implements OnInit {
  selection : string | undefined | null;

  formGroup: FormGroup;

  constructor(public userService:UserService, public customerService:CustomerService,
              private route:ActivatedRoute, private router: Router, private snackbar: MatSnackBar) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.max(50)]),
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
      this.formGroup.patchValue(res);
    })
  }

  handleSubmit() {
    let result = this.formGroup.value;

    if(this.selection) {
      this.customerService.changeCustomer(result, parseInt(this.selection)).subscribe(
        res => {
        this.router.navigate(['customer-overview']);
        },
        err => {
          this.snackbar.open(err.error.message, "" , {duration: 2500, verticalPosition: "top",
            horizontalPosition: "right"})
        }
      )
    } else {
      this.customerService.createCustomer(result).subscribe(
        res => {
        this.router.navigate(['customer-overview']);
        },
        err => {
          this.snackbar.open(err.error.message, "" , {duration: 2500, verticalPosition: "top",
            horizontalPosition: "right"})
        }
      )
    }
  }
}
