import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../components/button/button.component";
import { Employee } from 'src/app/models/Employee';
import { RouterLink } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
    selector: 'app-admin-overview',
    standalone: true,
    templateUrl: './admin-overview.component.html',
    styleUrl: './admin-overview.component.scss',
    imports: [CommonModule, ButtonComponent, RouterLink]
})
export class AdminOverviewComponent {
    employees: Employee[] = []

    constructor(public employeeService: EmployeeService) {

    }

    yo(message: string) {
      alert(message);
    }
}
