import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EmployeeGroup} from "../models/EmployeeGroup";

const baseurl: string = "/api/employeegroups"

@Injectable({
  providedIn: 'root'
})
export class EmployeeGroupService {

  constructor(private http:HttpClient) { }

  getEmployeeGroups() {
    return this.http.get<EmployeeGroup>(baseurl)
  }
}
