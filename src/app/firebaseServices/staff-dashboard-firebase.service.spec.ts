import { TestBed } from '@angular/core/testing';

import { StaffDashboardFirebaseService } from './staff-dashboard-firebase.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

describe('StaffDashboardFirebaseService', () => {
  let service: StaffDashboardFirebaseService;
  const FirestoreStub = {
    collection: (name: string) => ({
      doc: (id: string) => ({
        valueChanges: () => new BehaviorSubject({foo: 'Bar'}),
        set: (value: any) => new Promise((resolve, reject) => resolve()),
      }),
    }),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: AngularFirestore, useValue: FirestoreStub} , {provide: HttpClient}, {provide: HttpHandler}]
    });
    service = TestBed.inject(StaffDashboardFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
