import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListComponent } from "./components/list/list.component";
import { UserService } from "./services/user.service";
import { IconSetService } from '@coreui/icons-angular';
import { cilHome, cilUser, cilCheckCircle } from '@coreui/icons';
import {InputfieldComponent} from "./components/inputfield/inputfield.component";
import {SelectfieldComponent} from "./components/selectfield/selectfield.component";
import { AdminOverviewComponent } from "./pages/admin-overview/admin-overview.component";
import {HomeLoginComponent} from "./pages/home-login/home-login.component";
import {VehicleDetailComponent} from "./pages/vehicle-detail/vehicle-detail.component";
import {CustomerOverviewComponent} from "./pages/customer-overview/customer-overview.component";
import {VehicleOverviewComponent} from "./pages/vehicle-overview/vehicle-overview.component";
import {OrderOverviewComponent} from "./pages/order-overview/order-overview.component";
import {EmployeeDetailComponent} from "./pages/employee-detail/employee-detail.component";
import {TaskDetailComponent} from "./pages/task-detail/task-detail.component";
import {OrderDetailComponent} from "./pages/order-detail/order-detail.component";
import {CustomerDetailsComponent} from "./pages/customer-details/customer-details.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    ListComponent,
    InputfieldComponent,
    SelectfieldComponent,
    AdminOverviewComponent,
    HomeLoginComponent,
    VehicleDetailComponent,
    CustomerOverviewComponent,
    VehicleOverviewComponent,
    OrderOverviewComponent,
    EmployeeDetailComponent,
    TaskDetailComponent,
    OrderDetailComponent,
    CustomerDetailsComponent
  ]
})
export class AppComponent implements OnInit{
  title = 'taskhub-frontend';

  constructor(public userService: UserService, private router: Router, public iconSet: IconSetService) {
    iconSet.icons = { cilHome, cilUser, cilCheckCircle };
  }

  ngOnInit(): void {

  }

  sendMessage(message: string) {
    alert(message);
  }

  executeLogout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }
}
