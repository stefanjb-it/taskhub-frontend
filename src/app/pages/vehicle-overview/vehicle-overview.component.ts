import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {UserService} from "../../services/user.service";
import {Vehicle} from "../../models/Vehicle";
import {VehicleService} from "../../services/vehicle.service";
import {RouterLink} from "@angular/router";
import {UnvehicletypePipe} from "../../pipes/unvehicletype.pipe";

@Component({
  selector: 'app-vehicle-overview',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink, UnvehicletypePipe],
  templateUrl: './vehicle-overview.component.html',
  styleUrl: './vehicle-overview.component.scss'
})
export class VehicleOverviewComponent {
  vehicles: Vehicle[] = [];

  constructor(public vehicleService: VehicleService, public userService: UserService) {
  }

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
    });
  }

  alert(key:string){
    alert(key)
  }
}
