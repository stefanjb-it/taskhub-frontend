import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {TaskList} from 'src/app/models/Task';
import {RouterLink} from '@angular/router';
import {TaskService} from 'src/app/services/task.service';
import {TaskTypeService} from "../../services/task-type.service";
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ImageService} from "../../services/image.service";
import {DateInputfieldComponent} from "../../components/date-inputfield/date-inputfield.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-task-overview',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink, InputfieldComponent, SelectfieldComponent, ReactiveFormsModule,
    DateInputfieldComponent],
  templateUrl: './task-overview.component.html',
  styleUrl: './task-overview.component.scss'
})
export class TaskOverviewComponent implements OnInit {
  tasks: TaskList[] = [];
  filteredTasks: TaskList[] = [];

  formGroup:FormGroup;
  private defaultFrom:number;
  private defaultTo:number;

  constructor(public taskService: TaskService, public userService: UserService, public taskTypeService: TaskTypeService,
              private imageService: ImageService, private snackbar: MatSnackBar) {
    this.formGroup = new FormGroup({
      title: new FormControl(''),
      from: new FormControl(null),
      to: new FormControl(null)
    });
    this.formGroup.valueChanges.subscribe(value => {
      this.filterTaskList(this.formGroup.value);
    });

    // Date Setup for filtering
    let now = new Date();
    this.defaultFrom = now.setMonth(now.getMonth() - 1);
    this.defaultTo = now.setMonth(now.getMonth() + 2); // 2 'cause object is changed in the first setMonth
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  filterTaskList(val:any) {
    let titleFilter = this.formGroup.value.title;
    let fromFilter = this.formGroup.value.from ? Date.parse(this.formGroup.value.from) : this.defaultFrom;
    let toFilter = this.formGroup.value.to ? Date.parse(this.formGroup.value.to) : this.defaultTo;

    this.filteredTasks = this.tasks.filter( task => {
      return this.isContainedTitle(task, titleFilter ? titleFilter : '')
        && this.isContainedDate(task, fromFilter, toFilter);
    })
  }

  isContainedTitle(task:TaskList, titleFilter:string) : boolean {
    return task.title.toLowerCase().includes(titleFilter.toLowerCase());
  }

  isContainedDate(task:TaskList, fromFilter:number, toFilter:number) : boolean {
    let date = Date.parse(task.scheduled_to)
    return date >= fromFilter && date <= toFilter;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(
      res => {
        this.filteredTasks = this.filteredTasks.filter(task => task.id != id)
      },
      err => {
        this.snackbar.open(err.error.message, "" , {duration: 2500, verticalPosition: "top",
          horizontalPosition: "right"})
      }
    );
  }
}
