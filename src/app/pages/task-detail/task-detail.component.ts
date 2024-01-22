import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {ChangeTask, Task} from "../../models/Task";
import {TaskType} from "../../models/TaskType";
import {TaskStatus} from "../../models/TaskStatus";
import {Order} from "../../models/Order";
import {Employee} from "../../models/Employee";
import {Vehicle} from "../../models/Vehicle";
import {Image} from "../../models/Image";
import {UserService} from "../../services/user.service";
import {EmployeeService} from "../../services/employee.service";
import {OrderService} from "../../services/order.service";
import {VehicleService} from "../../services/vehicle.service";
import {TaskService} from "../../services/task.service";
import {TaskTypeService} from "../../services/task-type.service";
import {TaskStatusService} from "../../services/task-status.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit {
  newTask : ChangeTask = {
    title: undefined,
    task_type: undefined,
    task_status: undefined,
    order: undefined,
    employees: undefined,
    vehicles: undefined,
    scheduled_from: undefined,
    from_shift: undefined,
    scheduled_to: undefined,
    to_shift: undefined
  };
  taskTypes: TaskType[] = [];
  orders: Order[] = [];
  employees: Employee[] = [];
  vehicles: Vehicle[] = [];
  taskstatuses: TaskStatus[] = [];
  selection : string | undefined | null;

  constructor(public userService:UserService, public orderService:OrderService,
              public vehicleService:VehicleService, public employeeService:EmployeeService,
              public taskTypeService:TaskTypeService, public taskStatusService:TaskStatusService,
              public taskService:TaskService, private route:ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.taskTypeService.getTaskTypes().subscribe((taskTypes: TaskType[]) => {
      this.taskTypes = taskTypes;
    });
    this.orderService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
    });
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
    this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      this.vehicles = vehicles;
    });
    this.taskStatusService.getTaskStatuses().subscribe((taskstatuses: TaskStatus[]) => {
      this.taskstatuses = taskstatuses;
    });

    this.selection = this.route.snapshot.paramMap.get('id');
    if(this.selection) {
      this.taskService.getTask(parseInt(this.selection)).subscribe( task => {
        this.newTask.title = task.title
        this.newTask.task_type = task.task_type.id
        this.newTask.task_status = task.task_status.id
        this.newTask.order = task.order.id
        task.employees.forEach(employee => { this.newTask.employees?.push(employee.id) })
        task.vehicles.forEach(vehicle => { this.newTask.vehicles?.push(vehicle.id) })
        this.newTask.scheduled_from = task.scheduled_from.length > 10 ? task.scheduled_from.substring(0,10) : task.scheduled_from
        this.newTask.scheduled_to = task.scheduled_to.length > 10 ? task.scheduled_to.substring(0,10) : task.scheduled_to
        this.newTask.from_shift = task.from_shift
        this.newTask.to_shift = task.to_shift

      });
    }
  }

  getTitle($event: string) {
    this.newTask.title = $event;
  }

  getTaskType($event: string) {
    if ($event != '-1') {
      this.newTask.task_type = parseInt($event);
    }
  }

  getOrder($event: string) {
    if ($event != '-1') {
      this.newTask.order = parseInt($event);
    }
  }

  getEmployee($event: string) {
    if ($event != '-1') {
      this.newTask.employees = [];
      this.newTask.employees?.push(parseInt($event));
    }
  }

  getVehicle($event: string) {
    if ($event != '-1') {
      this.newTask.vehicles = [];
      this.newTask.vehicles?.push(parseInt($event));
    }
  }

  getTaskStatus($event: string) {
    if ($event != '-1') {
      this.newTask.task_status = parseInt($event);
    }
  }

  getShiftFrom($event: string) {
    if ($event != '-1') {
      if ($event == '0'){
        this.newTask.from_shift = 'am';
      } else {
        this.newTask.from_shift = 'pm';
      }
    }
  }

  getShiftTo($event: string) {
    if ($event != '-1') {
      if ($event == '0'){
        this.newTask.to_shift = 'am';
      } else {
        this.newTask.to_shift = 'pm';
      }
    }
  }

  getShiftId(shift:string) : number {
    if (shift == 'am') {
      return 0
    } else {
      return 1
    }
  }

  getSchedFrom($event: string) {
    this.newTask.scheduled_from = $event;
  }

  getSchedTo($event: string) {
    this.newTask.scheduled_to = $event;
  }

  uploadPicture() {

  }

  createOrEditTask() {
    if(this.selection) {
      this.taskService.changeTask(parseInt(this.selection), this.newTask).subscribe(
        res => {
          alert('Task updated successfully!')
          this.router.navigate(['task-overview'])
        },
        err => {
          alert(err.header)
        }
      );
    } else {
      this.taskService.createTask(this.newTask).subscribe(
        res => {
          alert('Task created successfully!')
          this.router.navigate(['task-overview'])
        },
        err => {
          alert(err.header)
        }
      );
    }
  }
}
