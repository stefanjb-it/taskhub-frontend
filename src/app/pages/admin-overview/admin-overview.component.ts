import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../components/button/button.component";
import { Employee } from 'src/app/models/Employee';
import {Router, RouterLink} from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import {UnobjectingPipe} from "../../pipes/unobjecting.pipe";
import {UserService} from "../../services/user.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {ImageService} from "../../services/image.service";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-admin-overview',
    standalone: true,
    templateUrl: './admin-overview.component.html',
    styleUrl: './admin-overview.component.scss',
  imports: [CommonModule, ButtonComponent, RouterLink, UnobjectingPipe, ReactiveFormsModule, InputfieldComponent]
})
export class AdminOverviewComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  filterFormControl = new FormControl('')

  constructor(public employeeService: EmployeeService, public userService: UserService, public router: Router,
              private imageService: ImageService, private snackbar: MatSnackBar) {
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
      let user = this.employees.find(employee => employee.id == id)
      if (user?.has_image) {
        this.imageService.deleteProfilePicture(id).subscribe()
      }

      this.employeeService.deleteEmployee(id).subscribe(
        res => this.filteredEmployees = this.filteredEmployees.filter(employee => employee.id != id),
        err => {
          this.snackbar.open(err.error.message, "" , {duration: 2500, verticalPosition: "top",
            horizontalPosition: "right"})
        }
      )

    } else {
      this.snackbar.open("Can't delete own User Account. Please ask your Administrator!", "" , {duration: 2500,
        verticalPosition: "top", horizontalPosition: "right"})
    }
  }
}
