import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {UserService} from "../../services/user.service";
import {EmployeeService} from "../../services/employee.service";
import {Employee, Group} from "../../models/Employee";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent {
  newEmployee: Employee = {
    'id': 0,
    'username': '',
    'first_name': '',
    'last_name': '',
    'email': '',
    'groups': [],
    'is_active': true,
    'employee_type': '',
    'address': '',
    'phone': '',
    'birth_date': '',
    'gender': '',
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
    console.log(this.newEmployee.birth_date);
  }

  getPassword($event: string) {

  }

  getEmployeeType($event: string) {
    this.newEmployee.employee_type = $event;
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

  }

  uploadPicture() {

  }
}
