import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {environment} from '../environments/environment';

import { AppComponent } from './app.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import {AngularFireModule} from 'angularfire2';

import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {SideNavService} from './layout/side-nav.service';
import {DropDownDirective} from './_shared/dropdown.directive';
import { StaffDashboardFirebaseService } from './firebaseServices/staff-dashboard-firebase.service';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginService } from './login/login.service';
import { FirebaseLoginService } from './firebaseServices/firebase-login.service';
import { StaffDashboardModule } from './staff-dashboard/staff-dashboard-module';
import { PassengerDetailsModule } from './passengerdetails/passenger-details-module';
import { LayoutsModule } from './layout/layouts-module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard-module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AndminDashboardFirebaseService } from './firebaseServices/andmin-dashboard-firebase.service';
import { LoginModule } from './login/login.module';
import { ServiceWorkerModule } from '../../node_modules/@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    DropDownDirective
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseconfig, 'flight-app'),
    StaffDashboardModule,
    PassengerDetailsModule,
    LoginModule,
    LayoutsModule,
    AppRoutingModule,
    AdminDashboardModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  SideNavService, LoginService, FirebaseLoginService, AndminDashboardFirebaseService,
  { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  , StaffDashboardFirebaseService, {provide: AngularFireAuthModule, useClass: AngularFireAuth}
],
entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



