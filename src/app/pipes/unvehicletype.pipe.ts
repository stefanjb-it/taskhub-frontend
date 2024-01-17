import { Pipe, PipeTransform } from '@angular/core';
import {VehicleType} from "../models/VehicleType";

@Pipe({
  name: 'unvehicletype',
  standalone: true
})
export class UnvehicletypePipe implements PipeTransform {

  transform(vehicleTypes: VehicleType[]): string {
    if (vehicleTypes.length == 0){
      return "";
    } else {
      return vehicleTypes.map(vehicleType => vehicleType.title).join(", ")
    }
  }

}
