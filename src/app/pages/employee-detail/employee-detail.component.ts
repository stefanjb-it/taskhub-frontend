import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {UserService} from "../../services/user.service";
import {EmployeeService} from "../../services/employee.service";
import {ChangeEmployee, Employee} from "../../models/Employee";
import {EmployeeType} from "../../models/EmployeeType";
import {EmployeeGroup} from "../../models/EmployeeGroup";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeTypeService} from "../../services/employee-type.service";
import {EmployeeGroupService} from "../../services/employee-group.service";

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {
  newEmployee: ChangeEmployee = {};
  selection : string | undefined | null;
  employeeTypes : EmployeeType[] = [];
  employeeGroups : EmployeeGroup[] = [];
  newEmpTypeTitle : string | undefined;

  constructor(public userService:UserService, private employeeTypeService:EmployeeTypeService,
              public employeeService:EmployeeService, private route:ActivatedRoute,
              public employeeGroupService: EmployeeGroupService, private router: Router) {
  }

  ngOnInit(){
    this.employeeTypeService.getEmployeeTypes().subscribe( employeeTypes => {
      this.employeeTypes = employeeTypes
    });
    this.employeeGroupService.getEmployeeGroups().subscribe( employeeGroups => {
      this.employeeGroups = employeeGroups
    });
    this.selection = this.route.snapshot.paramMap.get('id');
    if (this.selection) {
      this.employeeService.getEmployee(parseInt(this.selection)).subscribe( employee => {
        this.newEmployee.first_name = employee.first_name
        this.newEmployee.last_name = employee.last_name
        this.newEmployee.address = employee.address
        this.newEmployee.birth_date = employee.birth_date.length > 10 ? employee.birth_date.substring(0,10) : employee.birth_date
        this.newEmployee.email = employee.email
        this.newEmployee.password = employee.password
        this.newEmployee.phone = employee.phone
        this.newEmployee.gender = employee.gender
        this.newEmployee.employee_type = employee.employee_type.id
        this.newEmployee.drivers_license_status = employee.drivers_license_status
      });
      try {
        this.newEmpTypeTitle = this.employeeTypes.filter(type => type.id == this.newEmployee.employee_type)[0].title
      } catch {
        this.newEmpTypeTitle = '';
      }
    }
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
    switch ($event) {
      case '0':
        this.newEmployee.gender = 'diverse';
        break;
      case '1':
        this.newEmployee.gender = 'female';
        break;
      case '2':
        this.newEmployee.gender = 'male';
        break;
      default:
        this.newEmployee.gender = 'diverse';
        break;

    }
  }

  getBDate($event: string) {
    this.newEmployee.birth_date = $event;
  }

  getPassword($event: string) {
    this.newEmployee.password = $event;
  }

  getEmployeeType($event: string) {
    if ($event != '-1') {
      this.newEmployee.employee_type = parseInt($event);
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

  getEmployeeGroup($event: string) {
    this.newEmployee.groups = [];
    this.newEmployee.groups?.push($event)
  }

  getGenderId(gender: string) : number{
    switch (gender) {
      case 'diverse':
        return 0
      case 'female':
        return 1
      case 'male':
        return 2
      default:
        return -1
    }
  }

  createOrEditEmployee() {
    if (this.selection) {
      this.employeeService.changeEmployee(this.newEmployee, parseInt(this.selection)).subscribe(
        res => {
          alert('Employee updated successfully!')
          this.router.navigate(['admin-overview'])
        },
        err => {
          alert(err.header)
        }
      )
    } else {
      if (this.newEmployee.first_name != undefined && this.newEmployee.last_name != undefined) {
        this.newEmployee.username = this.newEmployee.first_name?.substring(0,3).toLowerCase()
          + this.newEmployee.last_name?.substring(0,3).toLowerCase() + '24';
      }

      this.employeeService.createEmployee(this.newEmployee).subscribe(
        res => {
          alert('Employee created successfully!')
          this.router.navigate(['admin-overview'])
        },
        err => {
          alert('Enter or Select a value for each Field.')
        }
      );
    }
  }

  uploadPicture() {

  }

}
