import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from "../../components/button/button.component";

@Component({
  selector: 'app-management-overview',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './management-overview.component.html',
  styleUrl: './management-overview.component.scss'
})
export class ManagementOverviewComponent {
  alert() {
    alert("Test");
  }
}
