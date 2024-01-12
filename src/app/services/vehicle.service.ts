import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ChangeVehicle, Vehicle} from "../models/Vehicle";

const baseurl: string = "/api/vehicles"

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http:HttpClient) { }

  getVehicles(title?: string, length?: number, weight?: number, type?: number) {
    let params: HttpParams = new HttpParams()
    if (title) { params.append("title", title) }
    if (length) { params.append("length", length) }
    if (weight) { params.append("weight", weight) }
    if (type) { params.append("type", type) }
    return this.http.get<Vehicle[]>(baseurl, { params })
  }

  getVehicle(id: number) {
    return this.http.get<Vehicle>(baseurl + "/" + id)
  }

  createVehicle(vehicle: ChangeVehicle) {
    return this.http.post(baseurl, vehicle)
  }

  changeVehicle(vehicle: ChangeVehicle, id: number) {
    return this.http.put(baseurl + "/" + id, vehicle)
  }

  deleteVehicle(id: number) {
    return this.http.delete(baseurl + "/" + id)
  }
}
