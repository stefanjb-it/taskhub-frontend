import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../components/button/button.component";
import { Employee } from 'src/app/models/Employee';
import { RouterLink } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import {UnobjectingPipe} from "../../pipes/unobjecting.pipe";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-admin-overview',
    standalone: true,
    templateUrl: './admin-overview.component.html',
    styleUrl: './admin-overview.component.scss',
  imports: [CommonModule, ButtonComponent, RouterLink, UnobjectingPipe]
})
export class AdminOverviewComponent implements OnInit {
    employees: Employee[] = [];

    constructor(public employeeService: EmployeeService, public userService: UserService) {
    }

    ngOnInit() {
      this.employeeService.getEmployees().subscribe(employees => {
        this.employees = employees;
      });
    }

    yo(message: string) {
      alert(message);
    }
}
