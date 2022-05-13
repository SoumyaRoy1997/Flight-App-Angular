import {NgModule} from '@angular/core';
import {  StaffDashboardComponent } from './staff-dashboard.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { StaffDashboardRoutingModule } from './staff-dashboard-routing.module';
import { EditFlightDetailsDialogComponent } from './edit-flight-details-dialog.component';
import { FirebaseLoginService } from '../firebaseServices/firebase-login.service';
import { EditPassengerSeatComponent } from './edit-passenger-seat.component';


@NgModule({
  declarations: [
    EditFlightDetailsDialogComponent,
    StaffDashboardComponent,
    EditPassengerSeatComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    StaffDashboardRoutingModule
  ],
exports: [
    EditFlightDetailsDialogComponent,
    StaffDashboardComponent,
    EditPassengerSeatComponent
],
providers: [FirebaseLoginService],
entryComponents: [EditFlightDetailsDialogComponent, EditPassengerSeatComponent]
})
export class StaffDashboardModule {}
