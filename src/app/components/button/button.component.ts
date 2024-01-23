import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnInit {

  @Input() buttonText: string = 'Button';
  @Input() isDisabled: boolean = false;
  @Output() OnClick = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit(): void {

  }

  emitEvent() {
    this.OnClick.emit('Button Clicked');
  }
}
