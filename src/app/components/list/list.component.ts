import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Item } from "../../models";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() list : Item[] = [];
  displayedColumns: string[] = ['picture', 'name', 'description', 'edit', 'delete'];
  @Output() OnDelete = new EventEmitter<number>();

  constructor(public userService: UserService) {
  }

  ngOnInit() {

  }

  delete(pk : number) {
    this.OnDelete.emit(pk);
  }

}
