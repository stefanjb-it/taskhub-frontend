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
    let params: HttpParams = new HttpParams()
    if (begin) params.append("begin", begin)
    if (end) params.append("end", end)
    return this.http.get<TaskList[]>(baseurl, { params })
  }

  getTask(id: number) {
    return this.http.get<Task>(baseurl + "/" + id)
  }

  createTask(task: ChangeTask) {
    return this.http.post(baseurl, task)
  }

  changeTask(task: ChangeTask) {
    return this.http.post(baseurl, task)
  }

  deleteTask(id: number) {
    return this.http.delete(baseurl + "/" + id)
  }
}
