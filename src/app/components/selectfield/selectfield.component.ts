import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-selectfield',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatOptionModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './selectfield.component.html',
  styleUrl: './selectfield.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectfieldComponent,
      multi: true
    }
  ]
})
export class SelectfieldComponent implements OnInit, ControlValueAccessor {

  @Input() items: any[] = [];
  @Input() required: boolean = false;
  @Input() conversionFunction: any = undefined;
  @Input() labelText: string = 'Please select';
  @Input() hint: string = 'Some hint';
  @Input() errorText: string = 'This field is required.';

  selection: FormControl = new FormControl(0);
  private propagateChange:any;

  constructor(private fb:FormBuilder) {
  }
  ngOnInit() {
    // VALIDATORS
    let validator = null;
    if (this.required) {
      validator = Validators.required;
    }

    // OnChange LOGIC
    this.selection = this.fb.control(null, {validators: validator});
    this.selection.valueChanges.subscribe((value) => {
      if (this.conversionFunction) {
        value = this.conversionFunction(value);
      }
      this.propagateChange(value);
    });
  }

  getName(item: any) {
    if (item.name) {
      return item.name;
    } else if (item.title) {
      return item.title;
    } else {
      return item.last_name + ', ' + item.first_name;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.selection.patchValue(obj, {emitEvent: false});
  }
}
