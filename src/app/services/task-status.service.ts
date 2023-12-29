import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskStatus} from "../models/TaskStatus";

const baseurl: string = "/api/taskstatuses/"

@Injectable({
  providedIn: 'root'
})
export class TaskStatusService {

  constructor(private http:HttpClient) { }

  getTaskStatuses() {
    return this.http.get<TaskStatus[]>(baseurl)
  }

  getTaskStatus(id: number) {
    return this.http.get<TaskStatus>(baseurl + id + "/")
  }
}
