import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../components/button/button.component";
import { Employee } from 'src/app/models/Employee';
import {Router, RouterLink} from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import {UnobjectingPipe} from "../../pipes/unobjecting.pipe";
import {UserService} from "../../services/user.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-admin-overview',
    standalone: true,
    templateUrl: './admin-overview.component.html',
    styleUrl: './admin-overview.component.scss',
  imports: [CommonModule, ButtonComponent, RouterLink, UnobjectingPipe, ReactiveFormsModule]
})
export class AdminOverviewComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  filterFormControl = new FormControl('')

  constructor(public employeeService: EmployeeService, public userService: UserService, public router: Router) {
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.filteredEmployees = employees;
    });
    this.filterFormControl.valueChanges.subscribe(value => {
      this.filterEmployees(value)
    });
  }

  filterEmployees(filterValue: string | null){
    this.filteredEmployees  = this.employees.filter( employee => {
      return !filterValue ||  employee.first_name.toLowerCase().includes(filterValue.toLowerCase()) ||
        employee.last_name.toLowerCase().includes(filterValue.toLowerCase())
    })
  }


  checkDelete(id:number) {
    if (id.toString() != this.userService.getUserId()) {
      this.employeeService.deleteEmployee(id).subscribe(
        res => alert('Employee deleted successfully!'),
        err => alert('Error occured!')
      )
    } else {
      alert("Can't delete own User Account. Please ask your Administrator!")
    }
  }
}
