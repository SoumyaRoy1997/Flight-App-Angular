import { Component, OnInit, Inject } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { IteMs } from '../_models/entity';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PassengerdetailsComponent } from './passengerdetails.component';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StaffDashboardFirebaseService } from '../firebaseServices/staff-dashboard-firebase.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import {animation} from '../_shared/animations';

@Component({
    selector: 'app-add-items-dialog',
    templateUrl: './add-items-dialog.html',
    styleUrls: ['./add-items-dialog.scss'],
    providers: [{provide: MatFormFieldControl , useExisting: AddItemsDialogComponent}],
    animations: [
      animation
    ],

  })
  export class AddItemsDialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<PassengerdetailsComponent>, private fb: FormBuilder,
                @Inject(MAT_DIALOG_DATA) public data,
                private snackBar: MatSnackBar,
                private firebaseservice: StaffDashboardFirebaseService) {}
    removeItems = false;
    items: IteMs[];
    promiseitem: Promise<IteMs[]>;
    rotateAdd = 'initial';
    flag = false;
    flagCount = false;
    ngOnInit() {
      const item = JSON.parse(localStorage.getItem('currentUser')).companyName;
      this.firebaseservice.getFlights().subscribe(
            data => {
              data.filter(value => value.company === item).forEach(values => this.items = values.item );
              if (this.items.length > 0) {
              this.flag = true;
              }
              if (this.items.length !== this.data.passenger.passengerflightdetails.items.length) {
              this.flagCount = true;
              }
            });
    }
    _removeItems(item: IteMs) {
      this.data.passenger.passengerflightdetails.items = this.data.passenger.passengerflightdetails.items.filter(obj =>
        obj.itemID !== item.itemID
      );
      const snackBarRef = this.snackBar.open('Item: ' + item.itemName + ' is Deleted', 'Close');
      this.update();
    }
    addItems(item: IteMs) {
      this.removeItems = false;
      if (!this.data.passenger.passengerflightdetails.items.some(r => r.itemID === item.itemID)) {
        this.data.passenger.passengerflightdetails.items.push(item);
        const snackBarRef = this.snackBar.open(item.itemName + ' Added in Cart', 'Close');
        this.update();
      } else {
        const snackBarRef = this.snackBar.open('Product is already in cart', 'Close');
      }

    }
    update() {
      this.firebaseservice.updatePassengerbookingdetails(this.data.passenger);
    }
    delete() {
      this.removeItems = true;
    }
    add() {
      this.removeItems = false;
    }
  }

