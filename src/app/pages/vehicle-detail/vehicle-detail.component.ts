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
import {SimpleInputFieldComponent} from "../../components/simple-input-field/simple-input-field.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MultipleSelectFieldComponent} from "../../components/multiple-select-field/multiple-select-field.component";
import {combineLatestWith} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MultiSelectfieldComponent} from "../../components/multi-selectfield/multi-selectfield.component";

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, InputfieldComponent, ButtonComponent, SelectfieldComponent, SimpleInputFieldComponent, ReactiveFormsModule, MultipleSelectFieldComponent, MultiSelectfieldComponent],
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

  formGroup: FormGroup;

  constructor(public userService:UserService, public vehicleService:VehicleService,
              public vehicleTypeService:VehicleTypeService, private route: ActivatedRoute, private router: Router) {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      vehicle_type: new FormControl(null, [Validators.required]),
      max_load_length: new FormControl('', [Validators.required, Validators.pattern("[0-9]+")]),
      max_load_weight: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.selection = this.route.snapshot.paramMap.get('id');

    if(!this.selection) {
      this.vehicleTypeService.getVehicleTypes().subscribe(res => {
        this.vehicleTypes = res;
      })
      return;
    }

    this.vehicleTypeService.getVehicleTypes().pipe(
      combineLatestWith(
        this.vehicleService.getVehicle(parseInt(this.selection))
      ),
    ).subscribe(([vehicleTypes, vehicle]) => {
      this.vehicleTypes = vehicleTypes;

      this.formGroup.patchValue(vehicle);
      this.formGroup.controls['vehicle_type'].setValue(vehicle.vehicle_type?.map(vehicleType => vehicleType.id));
    }, error => {
      this.router.navigate(['vehicle-overview'])
      }
    )
  }

  handleSubmit() {
    this.newVehicle = this.formGroup.value;

    if (this.selection) {
      this.vehicleService.changeVehicle(parseInt(this.selection), this.newVehicle).subscribe(
        res => {
        this.router.navigate(['vehicle-overview']);
        },
        err => {
          alert("Something went wrong, please try again.")
        }
      );
    } else {
      this.vehicleService.createVehicle(this.newVehicle).subscribe(
        res => {
          this.router.navigate(['vehicle-overview']);
        },
        err => {
          alert("Something went wrong, please try again.")
        }
      );
    }
  }
}
