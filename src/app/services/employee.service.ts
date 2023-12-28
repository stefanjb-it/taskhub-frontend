import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChangeEmployee, Employee} from "../models/Employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getEmployees(){
    return this.http.get<Employee[]>("/api/employees/")
  }

  getEmployee(id: number) {
    return this.http.get<Employee>("/api/employees/" + id + "/")
  }

  createEmployee(employee: Employee) {
    return this.http.post("/api/employees", employee)
  }

  changeEmployee(employee: ChangeEmployee, id: number) {
    return this.http.put("/api/employees" + id + "/", employee)
  }

  deleteEmployee(id: number) {
    return this.http.delete("/api/employees/" + id + "/")
  }
}
