import { Routes } from '@angular/router';
import {HomeLoginComponent} from "./pages/home-login/home-login.component";
import {AdminOverviewComponent} from "./pages/admin-overview/admin-overview.component";
import {EmployeeDetailComponent} from "./pages/employee-detail/employee-detail.component";
import {CustomerOverviewComponent} from "./pages/customer-overview/customer-overview.component";
import {CustomerDetailsComponent} from "./pages/customer-details/customer-details.component";
import {ManagementOverviewComponent} from "./pages/management-overview/management-overview.component";
import {OrderOverviewComponent} from "./pages/order-overview/order-overview.component";
import {OrderDetailComponent} from "./pages/order-detail/order-detail.component";
import {TaskDetailComponent} from "./pages/task-detail/task-detail.component";
import {VehicleOverviewComponent} from "./pages/vehicle-overview/vehicle-overview.component";
import {VehicleDetailComponent} from "./pages/vehicle-detail/vehicle-detail.component";
import {TaskOverviewComponent} from "./pages/task-overview/task-overview.component";
import {MultipleSelectFieldComponent} from "./components/multiple-select-field/multiple-select-field.component";

export const routes: Routes = [
  { path: '', component: HomeLoginComponent },
  { path: 'admin-overview', component: AdminOverviewComponent},
  { path: 'create-user', component: EmployeeDetailComponent},
  { path: 'edit-user/:id', component: EmployeeDetailComponent},
  { path: 'customer-overview', component: CustomerOverviewComponent},
  { path: 'create-customer', component: CustomerDetailsComponent},
  { path: 'edit-customer/:id', component: CustomerDetailsComponent},
  { path: 'management', component: ManagementOverviewComponent},
  { path: 'order-overview', component: OrderOverviewComponent},
  { path: 'create-order', component: OrderDetailComponent},
  { path: 'edit-order/:id', component: OrderDetailComponent},
  { path: 'task-overview', component: TaskOverviewComponent},
  { path: 'create-task', component: TaskDetailComponent},
  { path: 'edit-task/:id', component: TaskDetailComponent},
  { path: 'vehicle-overview', component: VehicleOverviewComponent},
  { path: 'create-vehicle', component: VehicleDetailComponent},
  { path: 'edit-vehicle/:id', component: VehicleDetailComponent},
  { path: 'test', component: MultipleSelectFieldComponent}
];
