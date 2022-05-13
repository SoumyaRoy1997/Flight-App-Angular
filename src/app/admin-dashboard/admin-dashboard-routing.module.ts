import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AuthGuard } from '../_helpers';
import { Role } from '../_models';


const routes: Routes = [
    {
        path: '',
        component:  AdminDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminDashboardRoutingModule {}

