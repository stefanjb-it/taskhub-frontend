import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {Task} from "../../models/Task";
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

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputfieldComponent, SelectfieldComponent],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent {
  newTask : Task = {
    id: 0,
    title: '',
    task_type: {id: 0, title: ''},
    task_status: {id: 0, title: ''},
    order: {id: 0, order_nr: 0, title: '', order_date: '', customer: {id: 0, name: '', address: '', phone: '',
        is_company: false}, is_completed: false},
    employees: [],
    vehicles: [],
    images: [],
    scheduled_from: '',
    from_shift: '',
    scheduled_to: '',
    to_shift: ''
  };
  taskTypes: TaskType[] = [];
  orders: Order[] = [];
  employees: Employee[] = [];
  vehicles: Vehicle[] = [];
  taskstatuses: TaskStatus[] = [];

  constructor(public userService:UserService, public orderService:OrderService,
              public vehicleService:VehicleService, public employeeService:EmployeeService,
              public taskTypeService:TaskTypeService, public taskStatusService:TaskStatusService,
              public taskService:TaskService) {
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
  }

  getTitle($event: string) {
    this.newTask.title = $event;
  }

  getTaskType($event: string) {
    if ($event != '-1') {
      this.taskTypeService.getTaskType(parseInt($event)).subscribe((taskType: TaskType) => {
        this.newTask.task_type = taskType;
      });
    }
  }

  getOrder($event: string) {
    if ($event != '-1') {
      this.orderService.getOrder(parseInt($event)).subscribe((order: Order) => {
        this.newTask.order = order;
      });
    }
  }

  getEmployee($event: string) {
    if ($event != '-1') {
      this.employeeService.getEmployee(parseInt($event)).subscribe((employee: Employee) => {
        console.log(employee);
        this.newTask.employees.push(employee);
      });
    }
  }

  getVehicle($event: string) {
    if ($event != '-1') {
      this.vehicleService.getVehicle(parseInt($event)).subscribe((vehicle: Vehicle) => {
        this.newTask.vehicles.push(vehicle);
      });
    }
  }

  getTaskStatus($event: string) {
    if ($event != '-1') {
      this.taskStatusService.getTaskStatus(parseInt($event)).subscribe((taskStatus: TaskStatus) => {
        this.newTask.task_status = taskStatus;
      });
    }
  }

  getShiftFrom($event: string) {
    this.newTask.from_shift = $event;
  }

  getShiftTo($event: string) {
    this.newTask.to_shift = $event;
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
    console.log(this.newTask);
  }
}
