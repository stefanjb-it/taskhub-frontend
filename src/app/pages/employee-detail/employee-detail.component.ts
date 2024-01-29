import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {UserService} from "../../services/user.service";
import {EmployeeService} from "../../services/employee.service";
import {EmployeeType} from "../../models/EmployeeType";
import {EmployeeGroup} from "../../models/EmployeeGroup";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EmployeeTypeService} from "../../services/employee-type.service";
import {EmployeeGroupService} from "../../services/employee-group.service";
import {ImageService} from "../../services/image.service";
import {combineLatestWith} from "rxjs";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SimpleInputFieldComponent} from "../../components/simple-input-field/simple-input-field.component";
import {SimpleSelectFieldComponent} from "../../components/simple-select-field/simple-select-field.component";
import {MultipleSelectFieldComponent} from "../../components/multiple-select-field/multiple-select-field.component";
import {MultiSelectfieldComponent} from "../../components/multi-selectfield/multi-selectfield.component";
import {DateInputfieldComponent} from "../../components/date-inputfield/date-inputfield.component";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent, ReactiveFormsModule,
    SimpleInputFieldComponent, SimpleSelectFieldComponent, MultipleSelectFieldComponent, MultiSelectfieldComponent,
    NgOptimizedImage, DateInputfieldComponent, RouterLink],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent implements OnInit {
  selection : string | undefined | null;
  employeeTypes : EmployeeType[] = [];
  employeeGroups : EmployeeGroup[] = [];
  pfpLink : string | undefined;

  licenseStatuses = [{id:false, name:'No'}, {id:true, name:'Yes'}];
  genderList = [{id:'diverse', name:'diverse'}, {id:'female', name:'female'}, {id:'male', name:'male'}];

  // TK Fix
  formGroup: FormGroup;
  private randomNumber:number = 0;
  isAdminAccess: boolean = false;

  constructor(public userService:UserService, private employeeTypeService:EmployeeTypeService,
              public employeeService:EmployeeService, private route:ActivatedRoute,
              public employeeGroupService: EmployeeGroupService, private router: Router,
              private imageService: ImageService, private snackbar: MatSnackBar) {
    this.formGroup = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl(''),
      username: new FormControl(''),
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
    if (!this.selection) {
      this.formGroup.get('first_name')?.valueChanges.subscribe(val => {
        if (this.formGroup.get('last_name')?.value && val) {
          this.formGroup.controls['username'].setValue(
            val.slice(0,3).toLowerCase() + this.formGroup.get('last_name')?.value.slice(0,3).toLowerCase() + this.randomNumber)
        }
      })
      this.formGroup.get('last_name')?.valueChanges.subscribe(val => {
        if (this.formGroup.get('first_name')?.value && val) {
          this.formGroup.controls['username'].setValue(
            this.formGroup.get('first_name')?.value.slice(0,3).toLowerCase() + val.slice(0,3).toLowerCase() + this.randomNumber)
        }
      })
    }
    this.isAdminAccess = this.userService.hasGroup(['Administrator']);
  }

  ngOnInit(){
    // Route Mapping
    this.selection = this.route.snapshot.paramMap.get('id');
    this.formGroup.controls['username'].setValue("Username")
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
      this.randomNumber = Math.floor(Math.random() * 100);
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
        this.employeeTypes = employeeTypes
        this.employeeGroups = employeeGroups

      try {
        this.randomNumber = employee.username?.slice(6,9) ? parseInt(employee.username?.slice(6,9)) : Math.floor(Math.random() * 100);
      } catch (e) {
        //console.log('no username supplied...')
      }

        this.formGroup.patchValue(employee);
        this.formGroup.controls['employee_type'].setValue(employee.employee_type?.id);
        this.formGroup.controls['groups'].setValue(employee.groups?.map(group => group.id));
        if (employee.has_image) {
          this.imageService.getProfilePicture(parseInt(typeof this.selection === "string" ? this.selection : "")
          ).subscribe(data => {
            this.pfpLink = "data:image/png;base64, "+ String(data);
          })
        }
      }, error => {
        this.router.navigate(['admin-overview'])
      }
    )
  }

  handleSubmit() {
    // pre-processing for fine tuning with backend
    let result = this.formGroup.value;
    result.groups = result.groups?.map((item: string) => parseInt(item));
    if (result.password == '' || result.password == null) {
      delete result.password;
    }

    if (this.selection) {
      this.employeeService.changeEmployee(result, parseInt(this.selection)).subscribe(
        res => {
          this.router.navigate(['admin-overview'])
        },
        err => {
          if (err.error.message.includes("ValidationError")) {
            let errorMsg = err.error.message.substring(20, err.error.message.length-18)
            this.snackbar.open(errorMsg, "" , {duration: 2500, verticalPosition: "top",
              horizontalPosition: "right"})
          } else {
            this.snackbar.open(err.error.message, "" , {duration: 2500, verticalPosition: "top",
              horizontalPosition: "right"})
          }
        }
      )
    } else {
      this.employeeService.createEmployee(result).subscribe(
        res => {
          this.router.navigate(['admin-overview'])
        },
        err => {
          this.snackbar.open(err.error.message ? err.error.message : 'An unforeseen error occurred, please retry!', "" , {duration: 2500, verticalPosition: "top",
            horizontalPosition: "right"})
        }
      )
    }
  }

  uploadPicture(event: any) {
    const file:File = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('upload', file)
    if (this.selection) {
      this.imageService.uploadProfilePicture(Number(this.selection), formData).subscribe(
        res => {
          this.imageService.getProfilePicture(parseInt(typeof this.selection === "string" ? this.selection : "")
          ).subscribe(data => {
            this.pfpLink = "data:image/png;base64, "+ String(data);
          })
        }, error => {
          this.snackbar.open(error.error.message, "" , {duration: 2500, verticalPosition: "top",
            horizontalPosition: "right"})
        }
      )
    }
  }
}
