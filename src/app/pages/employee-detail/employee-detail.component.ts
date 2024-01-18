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
    'last_name': 'Murmeltier',
    'email': 'Murmeltier@gmail.at',
    'groups': [{id: 0, name: 'Murmeltier'}],
    'is_active': true,
    'employee_type': 'Full-Time',
    'address': 'Murmeltierstraße 1, 1234 Murmeltierhausen',
    'phone': '0123456789',
    'birth_date': '01.01.2041',
    'gender': 'Murmeltier',
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

  createOrEditEmployee() {

  }

  uploadPicture() {

  }
}
