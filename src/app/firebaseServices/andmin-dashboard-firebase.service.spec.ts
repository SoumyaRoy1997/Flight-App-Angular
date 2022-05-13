import { TestBed } from '@angular/core/testing';

import { AndminDashboardFirebaseService } from './andmin-dashboard-firebase.service';

describe('AndminDashboardFirebaseService', () => {
  let service: AndminDashboardFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AndminDashboardFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
