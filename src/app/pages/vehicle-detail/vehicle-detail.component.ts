import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {ButtonComponent} from "../../components/button/button.component";
import {ChangeVehicle} from "../../models/Vehicle";
import {UserService} from "../../services/user.service";
import {VehicleService} from "../../services/vehicle.service";
import {VehicleTypeService} from "../../services/vehicle-type.service";
import {SelectfieldComponent} from "../../components/selectfield/selectfield.component";
import {VehicleType} from "../../models/VehicleType";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, InputfieldComponent, ButtonComponent, SelectfieldComponent],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent implements OnInit {
  newVehicle : ChangeVehicle = {
    title: '',
    vehicle_type: [],
    max_load_length: 0,
    max_load_weight: 0
  }
  vehicleTypes: VehicleType[] = [];
  selection : string | undefined | null;

  constructor(public userService:UserService, public vehicleService:VehicleService,
              public vehicleTypeService:VehicleTypeService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.vehicleTypeService.getVehicleTypes().subscribe((vehicleTypes: VehicleType[]) => {
      this.vehicleTypes = vehicleTypes;
    });
    this.selection = this.route.snapshot.paramMap.get('id');
    if (this.selection) {
      this.vehicleService.getVehicle(parseInt(this.selection)).subscribe(vehicle => {
        this.newVehicle.title = vehicle.title;
        vehicle.vehicle_type.forEach((vehicleType: VehicleType) => { this.newVehicle.vehicle_type.push(vehicleType.id) });
        this.newVehicle.max_load_length = vehicle.max_load_length;
        this.newVehicle.max_load_weight = vehicle.max_load_weight;
      });
    }
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
    if (this.selection) {
      this.vehicleService.changeVehicle(parseInt(this.selection), this.newVehicle).subscribe(
        res => {
          alert('Vehicle updated successfully!')
          this.router.navigate(['vehicle-overview'])
        },
        err => {
          alert(err.header)
        }
      );

    } else {
      this.vehicleService.createVehicle(this.newVehicle).subscribe(
        res => {
          alert('Vehicle created successfully!')
          this.router.navigate(['vehicle-overview'])
        },
        err => {
          alert(err.header)
        });
    }
  }
}
