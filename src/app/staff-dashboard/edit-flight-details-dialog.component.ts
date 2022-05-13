import { Component, OnInit, Inject } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { StaffDashboardComponent } from './staff-dashboard.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { EditPassengerSeatComponent } from './edit-passenger-seat.component';

@Component({
    selector: 'app-edit-flight-details-dialog',
    templateUrl: './edit-flight-details-dialog.html',
    styleUrls: ['./edit-flight-details-dialog.scss'],
    providers: [{provide: MatFormFieldControl , useExisting: EditFlightDetailsDialogComponent}]
  })
  export class EditFlightDetailsDialogComponent implements OnInit {
    isDisabled = true;
    passengerForm: FormGroup;
    checkin = {};
    constructor(
      public dialogRef: MatDialogRef<StaffDashboardComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      public dialog: MatDialog,
      private formBuilder: FormBuilder,
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer) { this.matIconRegistry.addSvgIcon(
        'baby',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/baby.svg')
      ); }
      get f() { return this.passengerForm.controls; }
      get t() { return this.f.seat_number as FormArray; }
      ngOnInit() {
        this.passengerForm = this.formBuilder.group({seat_number: new FormArray([])});
        const k = 0;
        let a = 0;
        let b = 1;
        let c = 2;
        let flag = true;
        const key = 'checkin';
        for (let i = 0; i < this.data.limit; i++) {
        for (let j = 0; j < (this.data.checkin.length) / 3; j++) {
          if (this.data.Seats[i] === this.data.checkin[c] && this.data.checkin[a] === true) {
            this.checkin[key] = new FormControl(this.data.checkin[a]);
            this.t.push(new FormGroup(this.checkin));
            flag = false;
            break;
          }
          a = a + 3;
          b = b + 3;
          c = c + 3;
        }
        a = 0;
        b = 1;
        c = 2;
        if (flag) {
          this.t.push(this.formBuilder.group({
            checkin: ['', Validators.required]
        }));
      }
        flag = true;

    }
      }
    onNoClick(): void {
      this.dialogRef.close();
    }
    changePassenger(seatNumber: number) {
      let seatForm: FormGroup;
      const k = 0;
      let a = 0;
      let b = 1;
      let c = 2;
      let flag = false;
      for (const j of this.data.checkin) {
        if (this.data.Seats[seatNumber] === this.data.checkin[c]) {
         seatForm = new FormGroup
         ({name: new FormControl()});
         seatForm.patchValue(
           {name: this.data.checkin[b]
           }
         );
         flag = true;
         break;
        }
        a = a + 3;
        b = b + 3;
        c = c + 3;
      }
      if (!flag) {
        seatForm = new FormGroup
         ({name: new FormControl()});
        seatForm.patchValue(
          {name: 'No Passenger in this Seat'
          }
        );
      }
      const dialogRef = this.dialog.open(EditPassengerSeatComponent, {
        width: 'auto',
        data: {
          seatForm,
          flightId: this.data.flightID,
          seatNumber: this.data.Seats[seatNumber],
          Seats: this.data.Seats
        }
      });
      
    }
  }
