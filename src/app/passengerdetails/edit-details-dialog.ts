import { Component, OnInit, Inject } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Passengerbookingdetails, Services, MeaLs } from '../_models/entity';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PassengerdetailsComponent } from './passengerdetails.component';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StaffDashboardFirebaseService } from '../firebaseServices/staff-dashboard-firebase.service';
import { AuthenticationService } from '../_services';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { animation } from '../_shared/animations';


@Component({
    selector: 'app-edit-details-dialog',
    templateUrl: './edit-details-dialog.html',
    styleUrls: ['./edit-details-dialog.scss'],
    providers: [{provide: MatFormFieldControl , useExisting: EditDetailsDialogComponent},
                {provide: DatePipe}],
    animations: [
      animation
    ]
  })
  export class EditDetailsDialogComponent implements OnInit {

    isDisabled = true;
    services = new Array();
    AncillaryService: Services[];
    passengerbookingdetails: Passengerbookingdetails[];
    isAdding = false;
    addServices: Services[];

    isAddMeal = false;
    isRemoveMeal = false;
    addMeals: MeaLs[];
    passengerMeals: MeaLs[];
    constructor(
      public dialogRef: MatDialogRef<PassengerdetailsComponent>, private fb: FormBuilder, private datePipe: DatePipe,
      @Inject(MAT_DIALOG_DATA) public data,
      private snackBar: MatSnackBar,
      private authenticationService: AuthenticationService,
      private firebaseservice: StaffDashboardFirebaseService) {}
      isRemoved = false;
      userrole: number;
      passengerForm = this.data.passengerForm;
      ngOnInit() {
        console.log(this.data.passenger);
        this.AncillaryService = this.data.passenger.services;
        this.passengerMeals = this.data.passenger.passengerflightdetails.meal;
        const item = JSON.parse(localStorage.getItem('currentUser')).companyName;
        this.firebaseservice.getFlights().subscribe(
            data => {
              data.filter(value => value.company === item).
              forEach(values => { this.addServices = values.services;
                                  this.addMeals = values.meal; });
            });
        this.authenticationService.currentUserSubject.subscribe(user => {
              if (user) {
              this.userrole = user.role;
              }
             });
      }
      RemoveService() {
        this.isRemoved = true;
        this.isAdding = false;
      }
      AddService() {
        this.isAdding = true;
        this.isRemoved = false;
      }
      Add(service: Services) {
        if (!this.data.passenger.services.some(value => value.serviceID === service.serviceID)) {
          this.data.passenger.services.push(service);
          this.firebaseservice.updatePassengerbookingdetails(this.data.passenger);
          const snackBarRef = this.snackBar.open('Service is added', 'Close');
        } else {
          const snackBarRef = this.snackBar.open('Service is already added', 'Close');
        }

      }
      Remove(service: Services) {
        this.data.passenger.services = this.data.passenger.services.filter(services => services.serviceID !== service.serviceID);
        this.firebaseservice.updatePassengerbookingdetails(this.data.passenger);
        this.AncillaryService = this.data.passenger.services;
        const snackBarRef = this.snackBar.open('Service is Removed', 'Close');
      }

      isRemoveMeals() {
        this.isRemoveMeal = true;
        this.isAddMeal = false;
      }

      RemoveMeal(meals: MeaLs) {
        this.data.passenger.passengerflightdetails.meal = this.data.passenger.passengerflightdetails.meal.
        filter(values => values.mealID !== meals.mealID);
        this.firebaseservice.updatePassengerbookingdetails(this.data.passenger);
        this.passengerMeals = this.data.passenger.passengerflightdetails.meal;
        const snackBarRef = this.snackBar.open('Service is Removed', 'Close');
      }
      isAddMeals() {
        this.isRemoveMeal = false;
        this.isAddMeal = true;
      }
      AddMeals(meals: MeaLs) {
        if (!this.data.passenger.passengerflightdetails.meal.some(value => value.mealID === meals.mealID)) {
          this.data.passenger.passengerflightdetails.meal.push(meals);
          this.firebaseservice.updatePassengerbookingdetails(this.data.passenger);
          const snackBarRef = this.snackBar.open('Meal is added', 'Close');
        } else {
          const snackBarRef = this.snackBar.open('Meal is already added', 'Close');
        }
      }
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
