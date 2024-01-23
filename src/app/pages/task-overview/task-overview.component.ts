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
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-task-overview',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink, InputfieldComponent, SelectfieldComponent, ReactiveFormsModule],
  templateUrl: './task-overview.component.html',
  styleUrl: './task-overview.component.scss'
})
export class TaskOverviewComponent implements OnInit {
  tasks: TaskList[] = [];
  filteredTasks: TaskList[] = [];
  schedFromFilter: string | undefined;
  schedToFilter: string | undefined;
  taskTypes: TaskType[] = [];

  seachfield : string | null | undefined;

  filterFormControl = new FormControl('')

  constructor(public taskService: TaskService, public userService: UserService, public taskTypeService: TaskTypeService) {
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
    this.taskTypeService.getTaskTypes().subscribe((taskTypes: TaskType[]) => {
      this.taskTypes = taskTypes;
    });
    this.filterFormControl.valueChanges.subscribe(value => {
      this.seachfield = value;
      this.filterTasks(this.seachfield)
    });
  }

  filterTasks(filterValue: string | null | undefined) {
    this.filteredTasks  = this.tasks.filter( task => {
      return this.scheduleFilterTask(task, filterValue)
    })
  }

  scheduleFilterTask (task:TaskList, filterValue: string | null | undefined) : boolean {
    let date = Date.parse(task.scheduled_to.substring(0, 10));
    let schedFrom = Date.parse(this.schedFromFilter || '');
    let schedTo = Date.parse(this.schedToFilter || '');

    if (this.schedFromFilter && this.schedToFilter && filterValue) {
      return date >= schedFrom && date <= schedTo && task.title.toLowerCase().includes(filterValue.toLowerCase());
    } else if(this.schedFromFilter && this.schedToFilter) {
      return date >= schedFrom && date <= schedTo;
    } else if (this.schedFromFilter && filterValue) {
      return date >= schedFrom && task.title.toLowerCase().includes(filterValue.toLowerCase());
    } else if (this.schedToFilter && filterValue) {
      return date <= schedTo && task.title.toLowerCase().includes(filterValue.toLowerCase());
    } else if(this.schedFromFilter && !this.schedToFilter && !filterValue) {
      return date >= schedFrom;
    } else if (this.schedToFilter && !this.schedFromFilter && !filterValue) {
      return date <= schedTo;
    } else if (filterValue && !this.schedFromFilter && !this.schedToFilter) {
      return task.title.toLowerCase().includes(filterValue.toLowerCase());
    } else {
      return true;
    }
  }

  getSchedFromFilter($event: string) {
    this.schedFromFilter = $event;
    this.filterTasks(this.seachfield)
  }

  getSchedToFilter($event: string) {
    this.schedToFilter = $event;
    this.filterTasks(this.seachfield)
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(
      res => {
        alert('Task deleted successfully!');
        this.filteredTasks = this.filteredTasks.filter(task => task.id != id)
      },
      err => alert('Error occured!')
    );
  }
}
