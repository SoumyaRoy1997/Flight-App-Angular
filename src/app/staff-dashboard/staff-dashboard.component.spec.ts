import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDashboardComponent } from './staff-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StaffDashboardFirebaseService } from '../firebaseServices/staff-dashboard-firebase.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs';

describe('StaffDashboardComponent', () => {
  let component: StaffDashboardComponent;
  let fixture: ComponentFixture<StaffDashboardComponent>;
  // const FirestoreStub = {
  //   collection: (name: string) => ({
  //     doc: (_id: string) => ({
  //       valueChanges: () => new BehaviorSubject({foo: 'Bar'}),
  //       set: (_d: any) => new Promise((resolve, _reject) => resolve()),
  //     }),
  //   }),
  // };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        RouterModule.forRoot([])
      ],
      declarations: [ StaffDashboardComponent ],
      // providers: [StaffDashboardFirebaseService, {provide: StaffDashboardFirebaseService},
      //   {provide: AngularFirestore, useValue: FirestoreStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
