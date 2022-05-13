import { Component, OnInit, Inject } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditFlightDetailsDialogComponent } from './edit-flight-details-dialog.component';
import {StaffDashboardFirebaseService} from '../firebaseServices/staff-dashboard-firebase.service';
import { Passengerbookingdetails } from '../_models/entity';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-edit-passenger-seat',
    templateUrl: './edit-passenger-seat.html',
    styleUrls: ['./edit-passenger-seat.scss'],
    providers: [{provide: MatFormFieldControl , useExisting: EditPassengerSeatComponent}]
  })
  export class EditPassengerSeatComponent implements OnInit {
      constructor(public dialogRef: MatDialogRef<EditFlightDetailsDialogComponent>,
                  @Inject(MAT_DIALOG_DATA) public data,
                  public firebaseService: StaffDashboardFirebaseService,
                  private snackBar: MatSnackBar) {}

    passengerbookingdetails = new Array();
    passenger: Passengerbookingdetails[];
    changePassenger: Passengerbookingdetails[];
      ngOnInit() {
          console.log(this.data.seatNumber);
      }
      onNoClick(): void {
        this.dialogRef.close();
      }
      updatePassenger(Name: string) {
        let seat: string;
        let flag = false;
        let flagSeat = false;
        if (Name !== 'No Passenger in this Seat') {
        this.firebaseService.getPassengerBookingdetails().subscribe(
            data => {
              if(!flagSeat)
              {
              this.passengerbookingdetails = data.
              filter(passenger =>
               passenger.passengerflightdetails.flight.flightId === this.data.flightId);
              this.passenger = this.passengerbookingdetails.filter(value => value.name === Name);
              this.changePassenger = this.passengerbookingdetails.
              filter(value => value.passengerflightdetails.seat_number === this.data.seatNumber);
              for (let i = 1; i <= this.data.Seats.length; i++) {
                this.passengerbookingdetails.forEach(element => {
                if (element.passengerflightdetails.seat_number.localeCompare(this.data.Seats[i - 1]) === 0) {
                  flag = true;
                }
                });
                if (!flag) {
                  seat = this.data.Seats[i - 1];
                  break;
                }
                flag = false;
                }
              if(this.changePassenger[0] !== undefined && this.changePassenger[0] !== null)
              {
               if ((this.passenger[0] !== undefined || this.passenger[0] !== null) && (this.changePassenger[0] !== undefined || this.changePassenger[0] !== null)) {
                  this.passenger[0].passengerflightdetails.seat_number = this.data.seatNumber;
                  this.changePassenger[0].passengerflightdetails.seat_number = seat;
                  this.firebaseService.updatePassengerbookingdetails(this.passenger[0]);
                  this.firebaseService.updatePassengerbookingdetails(this.changePassenger[0]);
                  const snackBarRef = this.snackBar.open(
                    'Successfully updated ' + Name + ' with: ' +this.data.seatNumber ,
                    'Close');
               
              } else {
                const snackBarRef = this.snackBar.open(
                  'Passenger Name: ' + Name + ' does not exist for this flight' ,
                  'Close');
              }
             }
             else
             {
              this.passenger[0].passengerflightdetails.seat_number = this.data.seatNumber;
              this.firebaseService.updatePassengerbookingdetails(this.passenger[0]);
              const snackBarRef = this.snackBar.open(
                'Successfully updated ' + Name + ' with: ' +this.data.seatNumber ,
                'Close');
             }
              flagSeat = true;
            }
            });
        } else {
            const snackBarRef = this.snackBar.open(
                'Please select a proper name' ,
                'Close');
        }
      }
  }
