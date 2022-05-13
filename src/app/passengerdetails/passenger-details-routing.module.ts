import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers';
import { Role } from '../_models';
import { PassengerdetailsComponent } from './passengerdetails.component';

const routes: Routes = [
    {
        path: '',
        component:  PassengerdetailsComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Staff , Role.Admin] }
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PassengerRoutingModule {}

