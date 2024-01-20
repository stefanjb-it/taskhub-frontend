import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {UserService} from "../../services/user.service";
import {EmployeeService} from "../../services/employee.service";
import {ChangeEmployee, Employee, Group} from "../../models/Employee";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent {
  newEmployee: ChangeEmployee = {
    'username': undefined,
    'first_name': undefined,
    'last_name': undefined,
    'email': undefined,
    'groups': [1],
    'is_active': undefined,
    'employee_type': undefined,
    'address': undefined,
    'phone': undefined,
    'birth_date': undefined,
    'gender': undefined,
    'drivers_license_status': true
  };

  constructor(public userService:UserService, public employeeService:EmployeeService) {
  }

  getFirstName($event: string) {
    this.newEmployee.first_name = $event;
  }

  getLastName($event: string) {
    this.newEmployee.last_name = $event;
  }

  getEmail($event: string) {
    this.newEmployee.email = $event;
  }

  getAddress($event: string) {
    this.newEmployee.address = $event;
  }

  getGender($event: string) {
    this.newEmployee.gender = $event;
  }

  getBDate($event: string) {
    this.newEmployee.birth_date = $event;
  }

  getPassword($event: string) {
    this.newEmployee.password = $event;
  }

  getEmployeeType($event: string) {
    if ($event != '-1') {
      this.newEmployee.employee_type = $event;
    }
  }

  getPhone($event: string) {
    this.newEmployee.phone = $event;
  }

  getLicense($event: string) {
    if ($event === 'Yes') {
      this.newEmployee.drivers_license_status = true;
    } else {
      this.newEmployee.drivers_license_status = false;
    }
  }

  createOrEditEmployee() {
    if (this.newEmployee.first_name != undefined && this.newEmployee.last_name != undefined) {
      this.newEmployee.username = this.newEmployee.first_name?.substring(0,3).toLowerCase()
        + this.newEmployee.last_name?.substring(0,3).toLowerCase() + '24';
    }

    this.employeeService.createEmployee(this.newEmployee).subscribe(data => {
      console.log(data);
    });
  }

  uploadPicture() {

  }
}
