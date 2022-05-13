import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Flights, Passengerflightdetails, Passengerbookingdetails } from '../_models/entity';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection , } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class StaffDashboardFirebaseService {
  flightCollection: AngularFirestoreCollection<Flights>;
  flightDoc: AngularFirestoreDocument<Flights>;
  Allflights: Observable<Flights[]>;

  passengerflightdetailscollec: AngularFirestoreCollection<Passengerflightdetails>;
  passengerflightdetails: Observable<Passengerflightdetails[]>;
  constructor(private http: HttpClient,
              public afs: AngularFirestore) {

  }
  baseurl = 'https://flight-app-ng.firebaseio.com/AllFlights.json';
  getFlights() {
  this.flightCollection = this.afs.collection<Flights>('AllFlights');
  this.Allflights = this.flightCollection.snapshotChanges().pipe(map(actions => {
    return actions.map(action => {
      const data = action.payload.doc.data() as Flights;
      const flightId = action.payload.doc.id;
      return { flightId, ...data };
    });
  }))
  ;
  return this.Allflights;
  }
 getPassengerFlightDetails() {
    this.passengerflightdetailscollec = this.afs.collection<Passengerflightdetails>('passengerflightdetails');
    this.passengerflightdetails = this.passengerflightdetailscollec.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Passengerflightdetails;
        const passengerID = action.payload.doc.id;
        return { passengerID, ...data };
      });
    }));
    return this.passengerflightdetails;
 }
 updatecheckinstatus(passenger: Passengerflightdetails) {
   this.afs.doc('passengerflightdetails/' + passenger.passengerID).update(passenger);
 }

 getPassengerBookingdetails() {
   return this.afs.collection<Passengerbookingdetails>('passengerbookingdetails').snapshotChanges().pipe(map(actions => {
    return actions.map(action => {
      const data = action.payload.doc.data() as Passengerbookingdetails;
      const bookingID = action.payload.doc.id;
      return { bookingID, ...data };
    });
  }));
 }

 updatePassengerbookingdetails(passenger: Passengerbookingdetails) {
  this.afs.doc('passengerbookingdetails/' + passenger.bookingID).update(passenger);
 }


}
