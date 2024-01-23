import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-inputfield',
  standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './inputfield.component.html',
  styleUrl: './inputfield.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputfieldComponent,
      multi: true
    }
  ]
})
export class InputfieldComponent implements OnInit, ControlValueAccessor {


  @Input() type:string = 'text';
  @Input() required: boolean = false;
  @Input() labelText: string = 'Please enter';
  @Input() placeholder: string = 'Please enter';
  @Input() hint: string = '';
  @Input() errorText: string = '';

  constructor(private sanitizer: DomSanitizer, private fb:FormBuilder) {
  }

  private propagateChange:any;
  selection:FormControl = new FormControl(null);

  ngOnInit() {
    // VALIDATORS
    let validator = null;
    if (this.required) {
      validator = Validators.required;
    }

    // OnChange LOGIC
    this.selection = this.fb.control(null, {validators: validator});
    this.selection.valueChanges.subscribe((value) => {
      console.log(value)
      if (value == ''){
        value = null;
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
