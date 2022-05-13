import { Injectable } from '@angular/core';

import { Admin } from '../_models/entity';
import { HttpClient } from '@angular/common/http';
import {AngularFireAuth} from 'angularfire2/auth';
import {auth} from 'firebase/app';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  User: Observable<Admin>;
  public currentUserSubject: BehaviorSubject<Admin>;
  public currentUser: Observable<Admin>;
  Admincollection: AngularFirestoreCollection<Admin>;
  admin: Observable<Admin[]>;
  constructor(private http: HttpClient,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {
                this.currentUserSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentUser')));
                this.currentUser = this.currentUserSubject.asObservable();
  }
  async googleSignin() {
    this.currentUserSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());

  }
  async SignOut() {
    await this.afAuth.auth.signOut();
  }
  getAdminData() {
    return this.http.get<Admin[]>('https://flight-app-ng.firebaseio.com/Login.json');
  }

  getLogin() {
    this.Admincollection = this.afs.collection<Admin>('Admin');
    this.admin = this.Admincollection.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Admin;
        const passengerID = action.payload.doc.id;
        return { passengerID, ...data };
      });
    }));
    return this.admin;
  }
}

