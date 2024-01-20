import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EmployeeType} from "../models/EmployeeType";

const baseurl: string = "/api/employeetypes"

@Injectable({
  providedIn: 'root'
})
export class EmployeeTypeService {

  constructor(private http:HttpClient) { }

  getEmployeeTypes() {
    return this.http.get<EmployeeType[]>(baseurl)
  }
}
