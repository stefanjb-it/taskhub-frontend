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

@Component({
  selector: 'app-multiple-select-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './multiple-select-field.component.html',
  styleUrl: './multiple-select-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultipleSelectFieldComponent,
      multi: true
    }
  ]
})
export class MultipleSelectFieldComponent implements OnInit, ControlValueAccessor {
  // deprecated
  list: any[] = [1,2,3,4,5];

  // modifiable input for dynamic reuse, add more @Inputs as needed
  @Input() required: boolean = false;
  @Input() id: string = 'multiple-select-field';
  @Input() items: any[] = [];
  @Input() conversionFunction: any = undefined;

  // part of the base structure for ControlValueAccessor
  selection:FormControl = new FormControl();
  private propagateChange: any;

  // FormBuilder is used to create the formControl
  constructor(private fb:FormBuilder) {
  }

  // necessary for ControlValueAccessor
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  // responsible for actually propagating the change
  writeValue(obj: any): void {
    this.selection.patchValue(obj, {emitEvent: false});
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
}
