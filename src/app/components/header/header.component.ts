import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet} from '@angular/router';
import { HeaderModule, ContainerComponent, HeaderBrandComponent, HeaderNavComponent, NavItemComponent, HeaderTextComponent } from '@coreui/angular';
import { ButtonComponent } from '../button/button.component';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeaderModule, RouterModule, RouterOutlet, ContainerComponent, HeaderBrandComponent, HeaderNavComponent, NavItemComponent, HeaderTextComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public userService:UserService) {
  }

  logout() {
    this.userService.logout();
  }

}
