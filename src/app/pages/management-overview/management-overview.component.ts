import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {UserService} from "../../services/user.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-management-overview',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink],
  templateUrl: './management-overview.component.html',
  styleUrl: './management-overview.component.scss'
})
export class ManagementOverviewComponent {
  constructor(public userService:UserService, public router: Router) {
  }
}
