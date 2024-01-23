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
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {DomSanitizer} from "@angular/platform-browser";

const THUMBUP_ICON:any =
  `
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
  `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
  `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>
`;

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent, SimpleInputFieldComponent, ReactiveFormsModule, SimpleSelectFieldComponent, MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent  implements OnInit {
  newCustomer : ChangeCustomer = {}
  selection : string | undefined | null;


  formGroup: FormGroup;

  constructor(public userService:UserService, public customerService:CustomerService,
              private route:ActivatedRoute, private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.max(50)]),
      address: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      is_company: new FormControl(null)
    });
    iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
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
