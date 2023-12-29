import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VehicleType} from "../models/VehicleType";

const baseurl: string = "/api/vehicletypes/"

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  constructor(private http:HttpClient) { }

  getVehicleTypes() {
    return this.http.get<VehicleType[]>(baseurl)
  }

  getVehicleType(id: number) {
    return this.http.get<VehicleType>(baseurl + id + "/")
  }
}
