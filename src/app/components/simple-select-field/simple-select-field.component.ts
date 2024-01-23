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
import {MultipleSelectFieldComponent} from "../multiple-select-field/multiple-select-field.component";

@Component({
  selector: 'app-simple-select-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MultipleSelectFieldComponent],
  templateUrl: './simple-select-field.component.html',
  styleUrl: './simple-select-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SimpleSelectFieldComponent,
      multi: true
    }
  ]
})
export class SimpleSelectFieldComponent implements OnInit, ControlValueAccessor {

  @Input() required: boolean = false;
  @Input() id: string = 'simple-select-field';
  @Input() items: any[] = [];
  @Input() placeholder: string = 'Select';
  // DEPRECATED
  @Input() list: any[] = [1,2,3,4,5];

  // part of the base structure for ControlValueAccessor
  selection:FormControl = new FormControl(0);
  private propagateChange: any;

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
