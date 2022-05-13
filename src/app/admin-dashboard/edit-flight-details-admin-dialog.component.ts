import { Component, OnInit, Inject } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { IteMs, MeaLs, Services } from '../_models/entity';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StaffDashboardFirebaseService } from '../firebaseServices/staff-dashboard-firebase.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AndminDashboardFirebaseService } from '../firebaseServices/andmin-dashboard-firebase.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { animation } from '../_shared/animations';

@Component({
    selector: 'app-edit-flight-details-admin-dialog',
    templateUrl: './edit-flight-details-admin-dialog.html',
    styleUrls: ['./edit-flight-details-admin-dialog.scss'],
    providers: [{provide: MatFormFieldControl , useExisting: EditFlightDetailsAdminDialogComponent}],
    animations: [
      animation
    ]
   })
  export class EditFlightDetailsAdminDialogComponent implements OnInit {
    isDisabled = true;
    itemForm: FormGroup;
    checkin = {};

    isEditItems = false;
    editItem: IteMs;
    isAddItem = false;

    editMeals: MeaLs;
    isEditMeals = false;
    isAddMeal = false;

    isAddservice = false;
    editService: Services;
    isEditService = false;

    constructor(
      public dialogRef: MatDialogRef<AdminDashboardComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private firebaseservice: AndminDashboardFirebaseService,
      private snackBar: MatSnackBar) { }

      ngOnInit() {
        this.itemForm = new FormGroup({
          itemName: new FormControl(),
          itemType: new FormControl(),
          price: new FormControl()
        });

      }
      cancel() {
        if (this.isEditItems) {
        this.isEditItems = !this.isEditItems;
        }
        if (this.isAddItem) {
        this.isAddItem = !this.isAddItem;
        }

        if (this.isEditMeals) {
        this.isEditMeals = false;
        }
        if (this.isAddMeal) {
        this.isAddMeal = false;
        }

        if (this.isAddservice) {
        this.isAddservice = false;
        }
        if (this.isEditService) {
        this.isEditService = false;
        }
      }
      AddService() {
        this.isAddservice = true;
      }
      AddMeal() {
        this.isAddMeal = true;
      }
      AddItem() {
        this.isAddItem = true;
      }
      EditItems(item: IteMs) {
        this.isEditItems = true;
        this.editItem = item;
      }
      update(itemType: string, itemName: string, price: number) {
        this.editItem.itemName = itemName;
        this.editItem.itemType = itemType;
        this.editItem.price = price;
        this.data.flight.item = this.data.flight.item.filter(values => values.itemID !== this.editItem.itemID);
        this.data.flight.item.push(this.editItem);
        this.firebaseservice.updateFlightDetails(this.data.flight);
        const snackBarRef = this.snackBar.open('Shop Items Successfully updated for ' + this.data.flight.flightId, 'Close');
        this.isEditItems = false;
      }
      RemoveItems(item: IteMs) {

        this.data.flight.item = this.data.flight.item.filter(values => values.itemID !== item.itemID);
        this.firebaseservice.updateFlightDetails(this.data.flight);
        const snackBarRef = this.snackBar.open(item.itemName + ' Successfully deleted for ' + this.data.flight.flightId, 'Close');
      }
      AddItems(itemType: string, itemName: string, price: number) {
        const addItem: IteMs = {itemID: 0, itemName: '', itemType: '', price: 0};
        addItem.itemName = itemName;
        addItem.itemType = itemType;
        addItem.price = price;
        addItem.itemID = 1;
        if (this.data.flight.item.length > 0) {
        let max = this.data.flight.item[0].itemID;
        for (let i = 1; i < this.data.flight.item.length; i++) {
          if (max < this.data.flight.item[i].itemID) {
            max = this.data.flight.item[i].itemID;
          }
        }
        addItem.itemID = max + 1;
        }
        this.data.flight.item.push(addItem);
        this.firebaseservice.updateFlightDetails(this.data.flight);
        const snackBarRef = this.snackBar.open(addItem.itemName + ' Successfully Added for ' + this.data.flight.flightId, 'Close');
        this.isAddItem = false;
      }


      updateMeals(mealName: string, price: number) {
        this.editMeals.mealName = mealName;
        this.editMeals.price = price;
        this.data.flight.meal = this.data.flight.meal.filter(meal => meal.mealID !== this.editMeals.mealID);
        this.data.flight.meal.push(this.editMeals);
        this.firebaseservice.updateFlightDetails(this.data.flight);
        const snackBarRef = this.snackBar.open('Meals Successfully updated for ' + this.data.flight.flightId, 'Close');
        this.isEditMeals = false;
      }
      AddMeals(mealName: string, price: number) {
        const addMeals: MeaLs = {mealID: 0, mealName: '', price: 0};
        addMeals.mealName = mealName;
        addMeals.price = price;
        addMeals.mealID = 1;
        if (this.data.flight.meal.length > 0) {
        let max = this.data.flight.meal[0].mealID;
        for (let i = 1; i < this.data.flight.meal.length; i++) {
          if (max < this.data.flight.meal[i].mealID) {
            max = this.data.flight.meal[i].mealID;
          }
        }
        addMeals.mealID = max + 1;
        }
        this.data.flight.meal.push(addMeals);
        this.firebaseservice.updateFlightDetails(this.data.flight);
        const snackBarRef = this.snackBar.open(addMeals.mealName + ' Successfully Added for ' + this.data.flight.flightId, 'Close');
        this.isAddMeal = false;
      }
      EditMeals(editmeals: MeaLs) {
        this.isEditMeals = true;
        this.editMeals = editmeals;
      }
      RemoveMeals(removemeals: MeaLs) {
        this.data.flight.meal = this.data.flight.meal.filter(meal => meal.mealID !== removemeals.mealID);
        this.firebaseservice.updateFlightDetails(this.data.flight);
        const snackBarRef = this.snackBar.open(removemeals.mealName + ' Successfully deleted for ' + this.data.flight.flightId, 'Close');

      }


      updateServices(servicename: string) {
        this.editService.serviceName = servicename;
        this.data.flight.services = this.data.flight.services.filter(service => service.serviceID !== this.editService.serviceID);
        this.data.flight.services.push(this.editService);
        this.firebaseservice.updateFlightDetails(this.data.flight);
        const snackBarRef = this.snackBar.open('Service Successfully updated for ' + this.data.flight.flightId, 'Close');
        this.isEditService = false;
      }
      AddServices(servicename: string) {
        const addService: Services = {serviceID: 0, serviceName: ''};
        addService.serviceName = servicename;
        addService.serviceID = 1;
        if (this.data.flight.services.length > 0) {
        let max = this.data.flight.services[0].serviceID;
        for (let i = 1; i < this.data.flight.services.length; i++) {
          if (max < this.data.flight.services[i].serviceID) {
            max = this.data.flight.services[i].serviceID;
          }
        }
        addService.serviceID = max + 1;
        }
        this.data.flight.services.push(addService);
        this.firebaseservice.updateFlightDetails(this.data.flight);
        const snackBarRef = this.snackBar.open(addService.serviceName + ' Successfully Added for ' + this.data.flight.flightId, 'Close');
        this.isAddservice = false;
      }
      EditServices(services: Services) {
        this.isEditService = true;
        this.editService = services;
      }
      RemoveServices(services: Services) {
        this.data.flight.services = this.data.flight.services.filter(service => service.serviceID !== services.serviceID);
        this.firebaseservice.updateFlightDetails(this.data.flight);
        const snackBarRef = this.snackBar.open(services.serviceName + ' Successfully deleted for ' + this.data.flight.flightId, 'Close');

      }
    }


