import { SharedModule } from '../_shared/shared.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { PassengerdetailsComponent } from './passengerdetails.component';
import { RouterModule } from '@angular/router';
import { PassengerRoutingModule } from './passenger-details-routing.module';
import { EditDetailsDialogComponent } from './edit-details-dialog';
import { AddItemsDialogComponent } from './add-items-dialog';
import { FirebaseLoginService } from '../firebaseServices/firebase-login.service';

@NgModule({
    declarations: [
      AddItemsDialogComponent,
      PassengerdetailsComponent,
      EditDetailsDialogComponent
    ],
    imports: [
      RouterModule,
      SharedModule,
      PassengerRoutingModule
    ],
  exports: [
    AddItemsDialogComponent,
    PassengerdetailsComponent,
    EditDetailsDialogComponent
  ],
  providers: [
    FirebaseLoginService
  ],
  entryComponents: [AddItemsDialogComponent,
    PassengerdetailsComponent,
    EditDetailsDialogComponent]
  })
  export class PassengerDetailsModule {}
