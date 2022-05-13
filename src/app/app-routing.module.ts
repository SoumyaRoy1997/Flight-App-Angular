import { NgModule } from '@angular/core';
import { Routes, RouterModule, provideRoutes } from '@angular/router';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  { path: 'AdminDashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard-module').
    then(m => m.AdminDashboardModule)
  },
  { path: 'StaffDashboard',
    loadChildren: () => import('./staff-dashboard/staff-dashboard-module').
    then(m => m.StaffDashboardModule)
  },
  {
    path: 'Passengerdetails',
    loadChildren: () => import('./passengerdetails/passenger-details-module').
    then(m => m.PassengerDetailsModule)
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
