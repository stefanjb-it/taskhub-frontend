import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {UserService} from "../../services/user.service";
import {Vehicle} from "../../models/Vehicle";
import {VehicleService} from "../../services/vehicle.service";
import {RouterLink} from "@angular/router";
import {UnvehicletypePipe} from "../../pipes/unvehicletype.pipe";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-vehicle-overview',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink, UnvehicletypePipe, ReactiveFormsModule],
  templateUrl: './vehicle-overview.component.html',
  styleUrl: './vehicle-overview.component.scss'
})
export class VehicleOverviewComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];

  filteredFormControl= new FormControl('')

  constructor(public vehicleService: VehicleService, public userService: UserService) {
  }

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
      this.filteredVehicles = vehicles;
    });
    this.filteredFormControl.valueChanges.subscribe( value => {
      this.filterVehicle(value);
    })
  }

  filterVehicle(filterValue: string | null){
    this.filteredVehicles = this.vehicles.filter( vehicle =>{
      return !filterValue || vehicle.title.toLowerCase().includes(filterValue.toLowerCase())
    })
  }

  deleteVehicle(id: number) {
    // TODO: implement with check
  }
}
