import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ChangeTask, Task, TaskList} from "../models/Task";

const baseurl: string = "/api/tasks"

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getTasks(begin?: string, end?: string) {
    let currentURL = baseurl;
    if (begin && end){
      currentURL += '?begin=' + begin + '&end=' + end;
    } else if (begin){
      currentURL += '?begin=' + begin;
    } else if (end){
      currentURL += '?end=' + end;
    }
    return this.http.get<TaskList[]>(currentURL)
  }

  getTask(id: number) {
    return this.http.get<Task>(baseurl + "/" + id)
  }

  createTask(task: ChangeTask) {
    return this.http.post(baseurl, task)
  }

  changeTask(id: number,task: ChangeTask) {
    return this.http.put(baseurl + "/" + id, task)
  }

  deleteTask(id: number) {
    return this.http.delete(baseurl + "/" + id)
  }
}
