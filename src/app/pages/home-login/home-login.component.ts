import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {ButtonComponent} from "../../components/button/button.component";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home-login',
  standalone: true,
  imports: [CommonModule, InputfieldComponent, ButtonComponent],
  templateUrl: './home-login.component.html',
  styleUrl: './home-login.component.scss'
})
export class HomeLoginComponent {
  userun : string = "";
  userpw : string = "";

  constructor(public userService: UserService) { }

  getUsername($event: string) {
    this.userun = $event;
  }

  getPassword($event: string) {
    this.userpw = $event;
  }

  userlogin() {
    this.userService.login({username: this.userun, password: this.userpw});
  }
}
