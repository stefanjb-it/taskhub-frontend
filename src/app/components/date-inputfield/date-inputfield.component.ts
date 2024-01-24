import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";

@Component({
  selector: 'app-date-inputfield',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './date-inputfield.component.html',
  styleUrl: './date-inputfield.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateInputfieldComponent,
      multi: true
    }
  ]
})
export class DateInputfieldComponent implements OnInit, ControlValueAccessor {

  // INPUT
  @Input() required: boolean = false;
  @Input() labelText: string = 'Please enter';
  @Input() hint: string = 'MM/DD/YYYY';
  @Input() errorText: string = 'This field is required.';
  @Input() conversionFunction: any = undefined;

  // LOGIC
  private propagateChange:any;
  selection:FormControl = new FormControl(null);

  constructor(private fb:FormBuilder) {
  }

  ngOnInit(): void {
    // VALIDATORS
    let validator = null;
    if (this.required) {
      validator = Validators.required;
    }

    // OnChange LOGIC
    this.selection = this.fb.control(null, {validators: validator});
    this.selection.valueChanges.subscribe((value) => {
      console.log(value)
      if (this.conversionFunction) {
        value = this.conversionFunction(value);
      }
      this.propagateChange(value);
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    console.log(obj);
    this.selection.patchValue(obj, {emitEvent: false});
  }

}
