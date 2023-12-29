import {VehicleType} from "./VehicleType";

export interface Vehicle {
  id: number
  title: string
  max_load_length: number
  max_load_weight: number
  vehicle_type: VehicleType[]
}

export interface ChangeVehicle {
  title: string
  max_load_length: number
  max_load_weight: number
  vehicle_type: number[]
}
