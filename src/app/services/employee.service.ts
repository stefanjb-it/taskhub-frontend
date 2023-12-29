import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChangeEmployee, Employee} from "../models/Employee";

const baseurl: string = "/api/employees/"

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getEmployees(){
    return this.http.get<Employee[]>(baseurl)
  }

  getEmployee(id: number) {
    return this.http.get<Employee>(baseurl + id + "/")
  }

  createEmployee(employee: Employee) {
    return this.http.post(baseurl, employee)
  }

  changeEmployee(employee: ChangeEmployee, id: number) {
    return this.http.put(baseurl + id + "/", employee)
  }

  deleteEmployee(id: number) {
    return this.http.delete(baseurl + id + "/")
  }
}
