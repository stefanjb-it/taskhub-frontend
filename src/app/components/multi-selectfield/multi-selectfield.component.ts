import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
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
  selector: 'app-multi-selectfield',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './multi-selectfield.component.html',
  styleUrl: './multi-selectfield.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiSelectfieldComponent,
      multi: true
    }
  ]
})
export class MultiSelectfieldComponent implements OnInit, ControlValueAccessor {

  // INPUT
  @Input() items: any[] = [];
  @Input() required: boolean = false;
  @Input() conversionFunction: any = undefined;
  @Input() labelText: string = 'Please select';

  // LOGIC
  selection: FormControl = new FormControl(null);
  private propagateChange:any;

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

  getName(item: any) {
    if (item.name) {
      return item.name;
    } else if (item.title) {
      return item.title;
    } else {
      return item.last_name + ', ' + item.first_name;
    }
  }

  writeValue(obj: any): void {
    console.log(obj);
    this.selection.patchValue(obj, {emitEvent: false});
  }

}
