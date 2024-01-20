import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {ButtonComponent} from "../../components/button/button.component";
import {ChangeVehicle} from "../../models/Vehicle";
import {UserService} from "../../services/user.service";
import {VehicleService} from "../../services/vehicle.service";
import {VehicleTypeService} from "../../services/vehicle-type.service";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {VehicleType} from "../../models/VehicleType";

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, InputfieldComponent, ButtonComponent, SelectfieldComponent],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent {
  newVehicle : ChangeVehicle = {
    title: '',
    vehicle_type: [],
    max_load_length: 0,
    max_load_weight: 0
  }
  vehicleTypes: VehicleType[] = [];

  constructor(public userService:UserService, public vehicleService:VehicleService,
              public vehicleTypeService:VehicleTypeService){

  }

  ngOnInit() {
    this.vehicleTypeService.getVehicleTypes().subscribe((vehicleTypes: VehicleType[]) => {
      this.vehicleTypes = vehicleTypes;
    });
  }

  getName($event: string) {
    this.newVehicle.title = $event;
  }

  getModel($event: string) {
    if ($event != '-1') {
      this.newVehicle.vehicle_type = [];
      this.newVehicle.vehicle_type.push(parseInt($event));
    }
  }

  getloadLength($event: string) {
    this.newVehicle.max_load_length = parseInt($event);
  }

  getloadWeigth($event: string) {
    this.newVehicle.max_load_weight = parseInt($event);
  }

  createVehicle() {
    console.log(this.newVehicle);
    this.vehicleService.createVehicle(this.newVehicle).subscribe((vehicle: any) => {
      console.log(vehicle);
    });
  }
}
