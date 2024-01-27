import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {TaskType} from "../../models/TaskType";
import {TaskStatus} from "../../models/TaskStatus";
import {Order} from "../../models/Order";
import {Employee} from "../../models/Employee";
import {Vehicle} from "../../models/Vehicle";
import {UserService} from "../../services/user.service";
import {EmployeeService} from "../../services/employee.service";
import {OrderService} from "../../services/order.service";
import {VehicleService} from "../../services/vehicle.service";
import {TaskService} from "../../services/task.service";
import {TaskTypeService} from "../../services/task-type.service";
import {TaskStatusService} from "../../services/task-status.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {combineLatestWith} from "rxjs";
import {SimpleInputFieldComponent} from "../../components/simple-input-field/simple-input-field.component";
import {SimpleSelectFieldComponent} from "../../components/simple-select-field/simple-select-field.component";
import {MultipleSelectFieldComponent} from "../../components/multiple-select-field/multiple-select-field.component";
import {ImageService} from "../../services/image.service";
import {MultiSelectfieldComponent} from "../../components/multi-selectfield/multi-selectfield.component";
import {DateInputfieldComponent} from "../../components/date-inputfield/date-inputfield.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent, SimpleInputFieldComponent,
    SimpleSelectFieldComponent, ReactiveFormsModule, MultipleSelectFieldComponent, MultiSelectfieldComponent,
    DateInputfieldComponent, RouterLink],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit {
  taskTypes: TaskType[] = [];
  orders: Order[] = [];
  employees: Employee[] = [];
  vehicles: Vehicle[] = [];
  taskStatuses: TaskStatus[] = [];

  selection: string | undefined | null;
  images: boolean | undefined;

  shiftOptions = [{id: 'am', title: 'am'}, {id: 'pm', title: 'pm'}];

  formGroup: FormGroup;
  isManagerAccess: boolean = false;

  constructor(public userService: UserService, public orderService: OrderService,
              public vehicleService: VehicleService, public employeeService: EmployeeService,
              public taskTypeService: TaskTypeService, public taskStatusService: TaskStatusService,
              public taskService: TaskService, private route: ActivatedRoute, private router: Router,
              private imageService: ImageService, private snackbar: MatSnackBar) {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      task_type: new FormControl(null, [Validators.required]),
      task_status: new FormControl(null, [Validators.required]),
      employees: new FormControl(null, [Validators.required]),
      order: new FormControl(null, [Validators.required]),
      vehicles: new FormControl(null),
      scheduled_from: new FormControl(null, [Validators.required]),
      from_shift: new FormControl(null, [Validators.required]),
      scheduled_to: new FormControl(null, [Validators.required]),
      to_shift: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    // Create Load
    this.selection = this.route.snapshot.paramMap.get('id');
    if (!this.selection) {
      this.isManagerAccess = true;
      this.taskTypeService.getTaskTypes().subscribe(
        res => {
          this.taskTypes = res;
        }
      );
      this.orderService.getOrders().subscribe(
        res => {
          this.orders = res;
        }
      );
      this.employeeService.getEmployees().subscribe(
        res => {
          this.employees = res;
        }
      );
      this.vehicleService.getVehicles().subscribe(
        res => {
          this.vehicles = res;
        }
      );
      this.taskStatusService.getTaskStatuses().subscribe(
        res => {
          this.taskStatuses = res;
        }
      );
      return;
    }

    if (this.userService.hasGroup(['Manager'])) {
      this.isManagerAccess = true;
      // Full Load
      this.employeeService.getEmployees().pipe(
        combineLatestWith(
          this.taskService.getTask(parseInt(this.selection))
        ),
        combineLatestWith(
          this.taskTypeService.getTaskTypes()
        ),
        combineLatestWith(
          this.orderService.getOrders()
        ),
        combineLatestWith(
          this.vehicleService.getVehicles()
        ),
        combineLatestWith(
          this.taskStatusService.getTaskStatuses()
        )
      ).subscribe(([[[[[employees, task], taskTypes], orders],
        vehicles], taskStatuses]) => {
          this.employees = employees;
          this.taskTypes = taskTypes;
          this.orders = orders;
          this.vehicles = vehicles;
          this.taskStatuses = taskStatuses;

          this.shiftOptions.filter(shift => shift.id === task.from_shift || task.to_shift);

          if (task.images) {
            this.images = task.images?.length > 0;
          }
          console.log(task.images)

          this.formGroup.patchValue(task);
          this.formGroup.controls['task_type'].setValue(task.task_type?.id);
          this.formGroup.controls['task_status'].setValue(task.task_status?.id);
          this.formGroup.controls['employees'].setValue(task.employees?.map(employee => employee.id));
          this.formGroup.controls['order'].setValue(task.order?.id);
          this.formGroup.controls['vehicles'].setValue(task.vehicles?.map(vehicle => vehicle.id));
        }, error => {
          console.log(error);
          this.router.navigate(['management'])
        }
      )

    } else {
      this.isManagerAccess = false;
      // Partial Load
      this.taskService.getTask(parseInt(this.selection)).pipe(
        combineLatestWith(
          this.taskStatusService.getTaskStatuses()
        )
      ).subscribe(output => {
        let [task, taskStatuses] = output;
          this.formGroup.patchValue(task);
          this.taskTypes = [task.task_type as TaskType];
          this.formGroup.controls['task_type'].setValue(task.task_type?.id);
          this.taskStatuses = taskStatuses;
          this.formGroup.controls['task_status'].setValue(task.task_status?.id);
          this.employees = task.employees.map(employee => {
            let parts = employee.username.split(' ');
            employee.last_name = parts[parts.length - 1];
            employee.first_name = parts.join(' ').replace(employee.last_name, '');
            return employee;
          });

        if (task.images) {
          this.images = task.images?.length > 0;
        }

          this.formGroup.controls['employees'].setValue(task.employees?.map(employee => employee.id));
          this.orders = [task.order as Order];
          this.formGroup.controls['order'].setValue(task.order?.id);
          this.vehicles = task.vehicles;
          this.formGroup.controls['vehicles'].setValue(task.vehicles?.map(vehicle => vehicle.id));
        }
      )
    }
  }

  uploadPicture(event: any) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('upload', file)

    if (this.selection) {
      this.imageService.uploadTaskImage(Number(this.selection), formData).subscribe(
        res => {
        }, error => {
          this.snackbar.open(error.error.message, "" , {duration: 2500, verticalPosition: "top",
            horizontalPosition: "right"})
        }
      )
    }
  }

  handleSubmit() {
    let result = this.formGroup.value;

    result.employees = result.employees.map((item: string) => parseInt(item));
    result.vehicles = result.vehicles?.map((item: string) => parseInt(item)) ?? [];

    if (this.selection) {
      this.taskService.changeTask(parseInt(this.selection), result).subscribe(
        res => {
          this.router.navigate(['task-overview'])
        },
        err => {
          this.snackbar.open(err.error.message, "" , {duration: 2500, verticalPosition: "top",
            horizontalPosition: "right"})
        }
      );
    } else {
      this.taskService.createTask(result).subscribe(
        res => {
          this.router.navigate(['task-overview'])
        },
        err => {
          this.snackbar.open(err.error.message, "" , {duration: 2500, verticalPosition: "top",
            horizontalPosition: "right"})
        }
      );
    }
  }
}
