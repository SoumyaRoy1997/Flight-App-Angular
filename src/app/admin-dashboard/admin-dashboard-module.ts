import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../_shared/shared.module';
import { AngularFireModule } from 'angularfire2';
import { RouterModule } from '@angular/router';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { EditFlightDetailsAdminDialogComponent } from './edit-flight-details-admin-dialog.component';
import { AddPassengersComponent } from './add-passengers-dialog.component';
import { FirebaseLoginService } from '../firebaseServices/firebase-login.service';

@NgModule({
    declarations: [
        AdminDashboardComponent,
        EditFlightDetailsAdminDialogComponent,
        AddPassengersComponent
    ],
    imports: [
      SharedModule,
      RouterModule,
      AdminDashboardRoutingModule
    ],
  exports: [
    AdminDashboardComponent,
    EditFlightDetailsAdminDialogComponent,
    AddPassengersComponent
  ],
  providers: [FirebaseLoginService],
  entryComponents: [ AdminDashboardComponent,
    EditFlightDetailsAdminDialogComponent,
    AddPassengersComponent]
  })
  export class AdminDashboardModule {}
