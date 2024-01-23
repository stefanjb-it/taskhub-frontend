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
import {ImageService} from "../../services/image.service";
import {combineLatestWith} from "rxjs";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SimpleInputFieldComponent} from "../../components/simple-input-field/simple-input-field.component";
import {SimpleSelectFieldComponent} from "../../components/simple-select-field/simple-select-field.component";
import {MultipleSelectFieldComponent} from "../../components/multiple-select-field/multiple-select-field.component";

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent, ReactiveFormsModule, SimpleInputFieldComponent, SimpleSelectFieldComponent, MultipleSelectFieldComponent],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {
  newEmployee: ChangeEmployee = {};
  selection : string | undefined | null;
  employeeTypes : EmployeeType[] = [];
  employeeGroups : EmployeeGroup[] = [];
  newEmpTypeTitle : string | undefined;
  newEmpGender : string | undefined;
  pfpLink : string | undefined;

  // TK Fix
  formGroup: FormGroup;

  constructor(public userService:UserService, private employeeTypeService:EmployeeTypeService,
              public employeeService:EmployeeService, private route:ActivatedRoute,
              public employeeGroupService: EmployeeGroupService, private router: Router,
              private imageService: ImageService) {
    this.formGroup = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl(''),
      address: new FormControl(null),
      birth_date: new FormControl(null),
      email: new FormControl(''),
      password: new FormControl(null),
      phone: new FormControl(null),
      gender: new FormControl(null),
      employee_type: new FormControl(null),
      drivers_license_status: new FormControl(null),
      groups: new FormControl(null)
    });
    this.formGroup.valueChanges.subscribe((value) => {
      console.log(value)
    });
  }

  ngOnInit(){
    // Route Mapping
    this.selection = this.route.snapshot.paramMap.get('id');
    if (!this.selection){
      this.employeeTypeService.getEmployeeTypes().subscribe(
        res => {
          this.employeeTypes = res
        }
      )
      this.employeeGroupService.getEmployeeGroups().subscribe(
        res => {
          this.employeeGroups = res
        }
      )
      return;
    }

    this.employeeTypeService.getEmployeeTypes().pipe(
      combineLatestWith(
        this.employeeService.getEmployee(parseInt(this.selection))
      ),
      combineLatestWith(
        this.employeeGroupService.getEmployeeGroups()
      )
    ).subscribe(([[employeeTypes, employee], employeeGroups]) => {
        console.log(employeeTypes, employee, employeeGroups);
        this.employeeTypes = employeeTypes
        this.employeeGroups = employeeGroups

        this.formGroup.patchValue(employee);
        this.formGroup.controls['employee_type'].setValue(employee.employee_type?.id);
        this.formGroup.controls['groups'].setValue(employee.groups?.map(group => group.id.toString()));
        if (employee.has_image) {
          this.pfpLink = "/api/users/" + this.selection + "/image"
        }
      }
    )
  }

  handleSubmit() {
    console.log(this.formGroup.value);
    // pre-processing for fine tuning with backend
    let result = this.formGroup.value;
    result.groups = result.groups.map((item: string) => parseInt(item));
    if (result.password == '' || result.password == null) {
      delete result.password;
    }

    this.employeeService.changeEmployee(this.formGroup.value, parseInt(this.selection ?? '')).subscribe(
      res => {
        alert('Employee updated successfully!')
        //this.router.navigate(['admin-overview'])
      },
      err => {
        alert(err.header)
      }
    )
  }

  toLicenseStatus(input : string | undefined):boolean | null{
    switch (input) {
      case "false":
        return false;
      case "true":
        return true;
      default:
        return null;
    }
  }

  toNumber(input : string | undefined):number | null{
    if (input == undefined) {
      return null;
    }
    return parseInt(input);
  }

  toNumberArray(input : string[] | undefined):number[] | null{
    if (input == undefined) {
      return null;
    }
    return input.map((item) => parseInt(item));
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
      console.log(this.newEmployee)
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

  uploadPicture(event: any) {
    const file:File = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('upload', file)
    console.log(file.name)
    console.log(this.selection)
    if (this.selection) {
      this.imageService.uploadProfilePicture(Number(this.selection), formData).subscribe(
        res => {
        }, error => {
          console.log(error)
        }
      )
    }
  }

}
