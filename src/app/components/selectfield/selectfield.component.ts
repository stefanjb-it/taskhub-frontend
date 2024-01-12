import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selectfield',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selectfield.component.html',
  styleUrl: './selectfield.component.scss'
})
export class SelectfieldComponent implements OnInit {
  @Input() list: string[] = [];
  @Input() id: string = 'testSelect';
  @Output() getValue = new EventEmitter<string>();
  value: string = '';

  constructor() {
  }
  ngOnInit() {
  }

  emitEvent() {
    this.value = (<HTMLInputElement>document.getElementById(this.id)).value;
    this.getValue.emit(this.value);
  }
}