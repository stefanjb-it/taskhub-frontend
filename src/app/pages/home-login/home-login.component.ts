import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {ButtonComponent} from "../../components/button/button.component";
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SimpleInputFieldComponent} from "../../components/simple-input-field/simple-input-field.component";

@Component({
  selector: 'app-home-login',
  standalone: true,
  imports: [CommonModule, InputfieldComponent, ButtonComponent, SimpleInputFieldComponent, ReactiveFormsModule],
  templateUrl: './home-login.component.html',
  styleUrl: './home-login.component.scss'
})
export class HomeLoginComponent {
  formGroup: FormGroup;

  constructor(public userService: UserService) {
    this.formGroup = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null)
    });
  }

  userLogin() {
    this.userService.login(this.formGroup.value);
  }
}
