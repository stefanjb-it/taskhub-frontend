import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {Task, TaskList} from 'src/app/models/Task';
import { RouterLink } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import {TaskType} from "../../models/TaskType";
import {TaskTypeService} from "../../services/task-type.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-task-overview',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink, InputfieldComponent, SelectfieldComponent],
  templateUrl: './task-overview.component.html',
  styleUrl: './task-overview.component.scss'
})
export class TaskOverviewComponent implements OnInit {
  tasks: TaskList[] = [];
  schedFilter: string | undefined;
  typeFilter: string | undefined;
  taskTypes: TaskType[] = [];

  constructor(public taskService: TaskService, public userService: UserService, public taskTypeService: TaskTypeService) {
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
    this.taskTypeService.getTaskTypes().subscribe((taskTypes: TaskType[]) => {
      this.taskTypes = taskTypes;
    });
  }

  yo(message: string) {
    alert(message);
  }

  getSchedFilter($event: string) {
    this.schedFilter = $event;
  }

  getTaskTypeFilter($event: string) {
    this.typeFilter = $event;
  }

  deleteTask(id: number) {
    // TODO: implement with check
  }
}
