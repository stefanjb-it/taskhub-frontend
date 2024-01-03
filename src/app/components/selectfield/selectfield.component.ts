import {Component, Input, OnInit} from '@angular/core';
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

  constructor() {
  }
  ngOnInit() {
  }
}
