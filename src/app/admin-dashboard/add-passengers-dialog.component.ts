import { Component, OnInit, Inject } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AndminDashboardFirebaseService } from '../firebaseServices/andmin-dashboard-firebase.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Services, Passengerbookingdetails, IteMs, MeaLs } from '../_models/entity';
import { StaffDashboardFirebaseService } from '../firebaseServices/staff-dashboard-firebase.service';

@Component({
    selector: 'app-add-passengers-dialog',
    templateUrl: './add-passengers-dialog.html',
    styleUrls: ['./add-passengers-dialog.scss'],
    providers: [{provide: MatFormFieldControl , useExisting: AddPassengersComponent}]
   })
  export class AddPassengersComponent implements OnInit {
    isDisabled = true;
    services = new Array();
    AncillaryService: Services[];
    passengerbookingdetails: Passengerbookingdetails[];
    isAdding = false;
    addServices: Services[];
    availableSeats = [];
    constructor(
      public dialogRef: MatDialogRef<AdminDashboardComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private firebaseservice: AndminDashboardFirebaseService,
      private firebasestaffservice: StaffDashboardFirebaseService,
      private fb: FormBuilder,
      private snackBar: MatSnackBar) { }
      passengerForm: FormGroup;
    ngOnInit() {
       this.passengerForm = new FormGroup({
        Name: new FormControl(),
        bookingID: new FormControl(),
        passengerID: new FormControl(),
        age: new FormControl(),
        passport: new FormControl(),
        dob: new FormControl(),
        address: new FormControl(),
        pnr: new FormControl(),
        wheelchair: new FormControl(),
        infants: new FormControl(),
        meals: new FormControl(),
        ancillaryServices: new FormControl(),
        seatPref: new FormControl(),
        seat_number: new FormControl(),
        checkin: new FormControl()
      });
       const seatArray: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
       let j = 0;
       const k = 0;
       let flag = false;
       const Seats = [];
       for (let i = 1; i <= this.data.flight.limitpassengers; i++) {
       if (j === seatArray.length) {
          j = 0;
       }
       Seats.push(seatArray[j] + i);
       j++;
    }
       this.firebasestaffservice.getPassengerBookingdetails().subscribe(data => {
        this.passengerbookingdetails = data.filter(
          passenger => passenger.passengerflightdetails.flight.flightId === this.data.flight.flightId);
        for (let i = 1; i <= Seats.length; i++) {
    this.passengerbookingdetails.forEach(element => {
    if (element.passengerflightdetails.seat_number.localeCompare(Seats[i - 1]) === 0) {
      flag = true;
    }
    });
    if (!flag) {
      this.availableSeats.push(Seats[i - 1]);
    }
    flag = false;
    }});
    }
    AddPassenger(passengerForm: FormGroup) {
      const passenger = {
        name: '',
        bookingID: '',
        passengerID: '',
        age: 0,
        dob: '',
        address: '',
        passport: false,
        services: [{}],
        pnr: '',
        passengerflightdetails:
        {
        wheelchair: '',
        infants: '',
        meals: false,
        ancillaryServices: '',
        seatPref: '',
        seat_number: '',
        checkin: '',
        passengerID: '',
        items: [{}],
        flight: {flightId: ''}
      }
      };
      passenger.address = passengerForm.value.address;
      passenger.age = passengerForm.value.age;
      passenger.bookingID = passengerForm.value.bookingID;
      passenger.dob = passengerForm.value.dob;
      passenger.name = passengerForm.value.Name;
      passenger.passengerflightdetails.ancillaryServices = passengerForm.value.ancillaryServices;
      passenger.passengerflightdetails.checkin = passengerForm.value.checkin;
      passenger.passengerflightdetails.flight.flightId = this.data.flight.flightId;
      passenger.passengerflightdetails.infants = passengerForm.value.infants;
      passenger.passengerflightdetails.items = [];
      passenger.passengerflightdetails.meals = passengerForm.value.meals;
      passenger.passengerflightdetails.passengerID = passengerForm.value.passengerID;
      passenger.passengerflightdetails.seatPref = passengerForm.value.seatPref;
      passenger.passengerflightdetails.seat_number = passengerForm.value.seat_number;
      passenger.passengerflightdetails.wheelchair = passengerForm.value.wheelchair;
      passenger.passport = passengerForm.value.passport;
      passenger.pnr = passengerForm.value.pnr;
      passenger.services = [];
      this.dialogRef.close();
      this.firebaseservice.addPassenger(passenger);
      this.data.flight.passengers = this.data.flight.passengers + 1;
      this.firebaseservice.updateFlightDetails(this.data.flight);
      const snackBarRef = this.snackBar.open('Passenger added for ' + this.data.flight.flightId, 'Close');

    }

    onNoClick(): void {
      this.dialogRef.close();
    }
  }
