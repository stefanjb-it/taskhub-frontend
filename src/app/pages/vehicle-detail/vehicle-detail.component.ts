import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputfieldComponent} from "../../components/inputfield/inputfield.component";
import {ButtonComponent} from "../../components/button/button.component";

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, InputfieldComponent, ButtonComponent],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent {
  vehicleName : string = "";
  vehicleModel : string = "";
  vehicleLength : string = "";
  vehicleWeigth : string = "";

  getName($event: string) {
    this.vehicleName = $event;
  }

  getModel($event: string) {
    this.vehicleModel = $event;
  }

  getloadLength($event: string) {
    this.vehicleLength = $event;
  }

  getloadWeigth($event: string) {
    this.vehicleWeigth = $event;
  }

  createVehicle() {
    console.log("idk yet");
    //TODO: Implement the service thingy
  }
}
