import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffDashboardComponent } from '../staff-dashboard/staff-dashboard.component';
import { AuthGuard } from '../_helpers';
import { Role } from '../_models';


const routes: Routes = [
    {
        path: '',
        component:  StaffDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Staff] }
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class StaffDashboardRoutingModule {}

