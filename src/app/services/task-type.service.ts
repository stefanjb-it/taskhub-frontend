import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { TaskType } from '../models/TaskType';

const baseurl: string = "/api/tasktypes"

@Injectable({
  providedIn: 'root'
})
export class TaskTypeService {

  constructor(private http:HttpClient) { }

  getTaskTypes() {
    return this.http.get<TaskType[]>(baseurl)
  }

  getTaskType(id: number) {
    return this.http.get<TaskType>(baseurl + "/" + id)
  }
}
