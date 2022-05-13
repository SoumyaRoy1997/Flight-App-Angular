import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FirebaseLoginService } from './firebase-login.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Admin } from '../_models/entity';



describe('FirebaseLoginService', () => {
  let service: FirebaseLoginService;
  let httpMock: HttpTestingController;
  const FirestoreStub = {
    collection: (name: string) => ({
      doc: (id: string) => ({
        valueChanges: () => new BehaviorSubject({foo: 'Bar'}),
        set: (value: any) => new Promise((Resolve, reject) => Resolve()),
      }),
    }),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FirebaseLoginService,
        {provide: AngularFirestore, useValue: FirestoreStub},
        {provide: AngularFireAuth, useValue: FirestoreStub}]
    });
    service = TestBed.inject(FirebaseLoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('#getObservableValue should return value from observable',
    (done: DoneFn) => {
    service.getAdminData().subscribe(value => {
      expect(value.length).toBe(5);
      done();
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch Admins as Observable', async(inject([HttpTestingController, FirebaseLoginService],
    (httpClient: HttpTestingController, firebaseService: FirebaseLoginService) => {
      const users = [
        {
           adminID: 'SpiceJetAdmin',
           companyName: 'SpiceJet',
           password: '12345',
           role: 2
        },
        {
           adminID: 'IndigoAdmin',
           companyName: 'Indigo',
           password: '12345',
           role: 2
        },
        {
           adminID: 'AirIndiaAdmin',
           companyName: 'Air India',
           password: '12345',
           role: 2
        },
        {
           adminID: 'VistaraAdmin',
           companyName: 'Vistara',
           password: '12345',
           role: 2
        },
        {
           adminID: 'Admin',
           companyName: 'Admin',
           password: '12345',
           role: 1
        }
     ];

      firebaseService.getAdminData().subscribe((user: any) => {
       expect(user.length).toBe(5);
     });

      const req = httpMock.expectOne('https://flight-app-ng.firebaseio.com/Login.json');
      expect(req.request.method).toBe('GET');

      req.flush(users);
      httpMock.verify();
    })));
});
