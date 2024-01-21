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
  @Input() list: any[] = [];
  @Input() id: string = 'testSelect';
  @Input() placeholder: string = 'Select';
  @Input() currentItem : any = '';
  @Output() getValue = new EventEmitter<string>();
  value: string = '';

  constructor() {
  }
  ngOnInit() {
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

  checkIfSelected(item: any){
    if (item.name) {
      return item.name === this.currentItem;
    } else if (item.title) {
      return item.title === this.currentItem;
    } else {
      return false;
    }
  }

  emitEvent() {
    this.value = (<HTMLInputElement>document.getElementById(this.id)).value;
    this.getValue.emit(this.value);
  }
}
