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
import {SimpleSelectFieldComponent} from "./components/simple-select-field/simple-select-field.component";
import {SelectfieldComponent} from "./components/selectfield/selectfield.component";
import {TaskImageCarouselComponent} from "./pages/task-image-carousel/task-image-carousel.component";
import {authGuard} from "./guards/auth.guard";
import {adminGuard} from "./guards/admin.guard";

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
  { path: 'csl', component: TaskImageCarouselComponent},

  //TODO: replace above with below after testing
  /*{ path: 'admin-overview', component: AdminOverviewComponent, canActivate: [authGuard,adminGuard]},
  { path: 'create-user', component: EmployeeDetailComponent, canActivate: [authGuard,adminGuard]},
  { path: 'edit-user/:id', component: EmployeeDetailComponent, canActivate: [authGuard,adminGuard]},
  { path: 'customer-overview', component: CustomerOverviewComponent, canActivate: [authGuard,managerGuard,supervisorGuard]},
  { path: 'create-customer', component: CustomerDetailsComponent, canActivate: [authGuard,managerGuard]},
  { path: 'edit-customer/:id', component: CustomerDetailsComponent, canActivate: [authGuard,managerGuard,supervisorGuard]},
  { path: 'management', component: ManagementOverviewComponent, canActivate: [authGuard]},
  { path: 'order-overview', component: OrderOverviewComponent, canActivate: [authGuard,managerGuard,supervisorGuard]},
  { path: 'create-order', component: OrderDetailComponent, canActivate: [authGuard,managerGuard]},
  { path: 'edit-order/:id', component: OrderDetailComponent, canActivate: [authGuard,managerGuard,supervisorGuard]},
  { path: 'task-overview', component: TaskOverviewComponent, canActivate: [authGuard]},
  { path: 'create-task', component: TaskDetailComponent, canActivate: [authGuard,managerGuard]},
  { path: 'edit-task/:id', component: TaskDetailComponent, canActivate: [authGuard,managerGuard,supervisorGuard]},
  { path: 'vehicle-overview', component: VehicleOverviewComponent, canActivate: [authGuard,managerGuard,supervisorGuard]},
  { path: 'create-vehicle', component: VehicleDetailComponent, canActivate: [authGuard,managerGuard]},
  { path: 'edit-vehicle/:id', component: VehicleDetailComponent, canActivate: [authGuard,managerGuard,supervisorGuard]},
  { path: 'csl/:id', component: TaskImageCarouselComponent, canActivate: [authGuard} */
];
