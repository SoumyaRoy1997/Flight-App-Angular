import { Injectable } from '@angular/core';
import { Flights, Passengerbookingdetails } from '../_models/entity';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AndminDashboardFirebaseService {

  flightCollection: AngularFirestoreCollection<Flights>;
  flightDoc: AngularFirestoreDocument<Flights>;
  Allflights: Observable<Flights[]>;

  passengercollec: AngularFirestoreCollection<Passengerbookingdetails>;
  constructor(private http: HttpClient,
              public afs: AngularFirestore) {

  }

  updateFlightDetails(Flight: Flights) {
    this.afs.doc('AllFlights/' + Flight.flightId).update(Flight);
  }

  addPassenger(passenger) {
    this.passengercollec = this.afs.collection('passengerbookingdetails');
    this.passengercollec.doc(passenger.bookingID).set(passenger);
  }
}
