import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";
import {UserService} from "../../services/user.service";
import {Vehicle} from "../../models/Vehicle";
import {VehicleService} from "../../services/vehicle.service";
import {RouterLink} from "@angular/router";
import {UnvehicletypePipe} from "../../pipes/unvehicletype.pipe";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";

@Component({
  selector: 'app-vehicle-overview',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink, UnvehicletypePipe, ReactiveFormsModule, InputfieldComponent],
  templateUrl: './vehicle-overview.component.html',
  styleUrl: './vehicle-overview.component.scss'
})
export class VehicleOverviewComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];

  filteredFormControl= new FormControl('')

  constructor(public vehicleService: VehicleService, public userService: UserService, private snackbar: MatSnackBar) {
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
    this.vehicleService.deleteVehicle(id).subscribe(
      res => {
        this.filteredVehicles = this.filteredVehicles.filter(vehicle => vehicle.id != id)
        this.vehicles = this.vehicles.filter(vehicle => vehicle.id != id)
      },
      err => {
        this.snackbar.open(err.error.message, "" , {duration: 2500, verticalPosition: "top",
          horizontalPosition: "right"})
      }
    );
  }
}
