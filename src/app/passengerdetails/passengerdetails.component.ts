import { Component, OnInit , ViewChild , AfterViewInit, ChangeDetectorRef, Input, Inject} from '@angular/core';
import {Flights, Passengerflightdetails , Passengerbookingdetails, AncillaryServices, IteMs, Services} from '../_models/entity';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AuthenticationService} from '../_services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {DatePipe} from '@angular/common';
import {MatSidenav} from '@angular/material/sidenav';
import { MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import {animate, state, style, transition, trigger, keyframes} from '@angular/animations';
import { StaffDashboardFirebaseService } from '../firebaseServices/staff-dashboard-firebase.service';
import { EditDetailsDialogComponent } from './edit-details-dialog';
import { AddItemsDialogComponent } from './add-items-dialog';

@Component({
  selector: 'app-passengerdetails',
  templateUrl: './passengerdetails.component.html',
  providers: [DatePipe],
  styleUrls: ['./passengerdetails.component.scss']
})
export class PassengerdetailsComponent implements AfterViewInit, OnInit {
  constructor(private authenticationService: AuthenticationService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private service: StaffDashboardFirebaseService
    ) {}
  Flight: Flights[];
  resultsLength = 0;
  isLoading = false;
  pageEvent: PageEvent;
  passengerflightdetails = new Array();
  passengerbookingdetails = new Array();
  fillerNav: Passengerbookingdetails[];
  flag = false;
  dataSource = new MatTableDataSource<Passengerbookingdetails[]>(this.passengerbookingdetails);
  isLoadingResults = true;
  displayedColumns: string[] = ['Passenger ID', 'Passenger Name', 'Seat Number', 'Action'];
  mobileQuery: MediaQueryList;
  id = '0';
  passengername: string;
  editpassenger: Passengerbookingdetails;
  isDisabled = true;
  panelOpenState = false;
  temp = new Array();
  userrole: number;
  filterdata = new Array();
  filterForm = new FormGroup({
  checkin: new FormControl(),
  notcheckedin: new FormControl(),
  wheelchair: new FormControl(),
  notwheelchair: new FormControl(),
  infants: new FormControl(),
  notinfants: new FormControl()
  });
  filterFormAdmin = new FormGroup({
    passport: new FormControl(),
    nopassport: new FormControl(),
    address: new FormControl(),
    noaddress: new FormControl(),
    dob: new FormControl(),
    nodob: new FormControl()
    });
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatSidenav)
  sidenav: MatSidenav;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  toggle() {
    this.sidenav.toggle();
  }
  ngOnInit() {
    this.id = localStorage.getItem('FlightID');
    this.isLoading = true;
    this.service.getPassengerBookingdetails().subscribe(data => {
            this.passengerbookingdetails = data.filter(passenger => passenger.passengerflightdetails.flight.flightId === this.id);
            this.dataSource = new MatTableDataSource<Passengerbookingdetails[]>(this.passengerbookingdetails);
            this.isLoadingResults = false;
            this.fillerNav = this.passengerbookingdetails;
            this.isLoading = false;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.resultsLength = this.passengerbookingdetails.length;
            if (this.passengerbookingdetails.length > 0) {
            this.flag = true;
            } else {
              const snackBarref = this.snackBar.open('No passengers for this flight', 'Close');
            }
          });
    this.authenticationService.currentUserSubject.subscribe(user => {
            if (user) {
            this.userrole = user.role;
            }
           });
  }

  ngAfterViewInit() {


    }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue != null || filterValue !== undefined) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
  FilterAdminForm(form: FormGroup) {
    this.sidenav.toggle();

    if ((form.value.passport && form.value.nopassport)
    || (form.value.address && form.value.noaddress)
    || (form.value.dob && form.value.nodob)) {
      Swal.fire('Incorrect Filter choices', 'Check your Input', 'error');
    } else {
      if (form.value.passport) {
      this.passengerbookingdetails.forEach(element => {
        if (element.passport) {
          this.temp.push(element);
        }
          });
       }
      if (form.value.nopassport) {
        this.passengerbookingdetails.forEach(element => {
        if (!element.passport) {
          this.temp.push(element);
        }
          });
       }
      if (form.value.address) {
        this.passengerbookingdetails.forEach(element => {
          if (element.address !== null || element.address !== '') {
            this.temp.push(element);
          }
            });
      }
      if (form.value.noaddress) {
        this.passengerbookingdetails.forEach(element => {
          if (element.address == null || element.address === '') {
            this.temp.push(element);
          }
            });
       }
      if (form.value.dob) {
        this.passengerbookingdetails.forEach(element => {
          if (element.dob !== null || element.dob !== '') {
            this.temp.push(element);
          }
            });
       }
      if (form.value.nodob) {
        this.passengerbookingdetails.forEach(element => {
          if (element.dob === null || element.dob === '') {
            this.temp.push(element);
          }
            });
       }
      this.filterdata = this.temp.filter(
        (obj, i, arr) => arr.findIndex(t => t.bookingID === obj.bookingID) === i
      );
      console.log(this.filterdata);
      this.dataSource = new MatTableDataSource<Passengerbookingdetails[]>(this.filterdata);
      this.resultsLength = this.filterdata.length;
      this.temp = new Array();
    }
  }
  Filter(form: FormGroup) {
    this.sidenav.toggle();
    if ((form.value.checkin && form.value.notcheckedin)
    || (form.value.wheelchair && form.value.notwheelchair)
    || (form.value.infants && form.value.notinfants)) {
      Swal.fire('Incorrect Filter choices', 'Check your Input', 'error');
    } else {
      if (form.value.checkin) {
      this.passengerbookingdetails.forEach(element => {
        if (element.passengerflightdetails.checkin) {
          this.temp.push(element);
        }
      });
       }
      if (form.value.notcheckedin) {
      this.passengerbookingdetails.forEach(element => {
        if (!element.passengerflightdetails.checkin) {
          this.temp.push(element);
        }
      });
       }
      if (form.value.wheelchair) {
      this.passengerbookingdetails.forEach(element => {
        if (element.passengerflightdetails.wheelchair) {
          this.temp.push(element);
        }
      });
       }
      if (form.value.notwheelchair) {
      this.passengerbookingdetails.forEach(element => {
        if (!element.passengerflightdetails.checkin) {
          this.temp.push(element);
        }
      });
       }
      if (form.value.infants) {
      this.passengerbookingdetails.forEach(element => {
        if (element.passengerflightdetails.infants) {
          this.temp.push(element);
        }
      });
       }
      if (form.value.notinfants) {
      this.passengerbookingdetails.forEach(element => {
        if (!element.passengerflightdetails.infants) {
          this.temp.push(element);
        }
      });
       }
      this.filterdata = this.temp.filter(
        (obj, i, arr) => arr.findIndex(t => t.bookingID === obj.bookingID) === i
      );
      this.dataSource = new MatTableDataSource<Passengerbookingdetails[]>(this.filterdata);
      this.resultsLength = this.filterdata.length;
      this.temp = new Array();
    }
  }
  clearFilter() {
    this.filterForm.reset();
    this.filterFormAdmin.reset();
    this.dataSource = new MatTableDataSource<Passengerbookingdetails[]>(this.passengerbookingdetails);
    this.resultsLength = this.passengerbookingdetails.length;
    this.sidenav.toggle();
  }
  openEditDialog(passenger: Passengerbookingdetails) {
    let passengerForm = new FormGroup({});
    if (this.userrole === 2) {
      passengerForm = new FormGroup({
      Name: new FormControl({ value: '', disabled: this.isDisabled }),
      bookingID: new FormControl({ value: '', disabled: this.isDisabled }),
      age: new FormControl({ value: '', disabled: this.isDisabled }),
      passport: new FormControl(),
      dob: new FormControl({ value: '', disabled: this.isDisabled }),
      address: new FormControl(),
      pnr: new FormControl({ value: '', disabled: this.isDisabled }),
      wheelchair: new FormControl(),
      infants: new FormControl(),
      meals: new FormControl(),
      ancillaryServices: new FormControl(),
      seatPref: new FormControl({ value: '', disabled: this.isDisabled }),
      seat_number: new FormControl()
    });
    } else {
      passengerForm = new FormGroup({
        Name: new FormControl(),
        bookingID: new FormControl({ value: '', disabled: this.isDisabled }),
        age: new FormControl({ value: '', disabled: this.isDisabled }),
        passport: new FormControl(),
        dob: new FormControl({ value: '', disabled: this.isDisabled }),
        address: new FormControl(),
        pnr: new FormControl({ value: '', disabled: this.isDisabled }),
        wheelchair: new FormControl({ value: '', disabled: this.isDisabled }),
        infants: new FormControl({ value: '', disabled: this.isDisabled }),
        meals: new FormControl({ value: '', disabled: this.isDisabled }),
        ancillaryServices: new FormControl({ value: '', disabled: this.isDisabled }),
        seatPref: new FormControl({ value: '', disabled: this.isDisabled }),
        seat_number: new FormControl({ value: '', disabled: this.isDisabled })
      });
    }
    passengerForm.patchValue({
      Name: passenger.name,
      bookingID: passenger.bookingID,
      age: passenger.age,
      passport: passenger.passport,
      dob: passenger.dob,
      address: passenger.address,
      pnr: passenger.pnr,
      passengerID: passenger.passengerflightdetails.passengerID,
      wheelchair: passenger.passengerflightdetails.wheelchair,
      infants: passenger.passengerflightdetails.infants,
      meals: passenger.passengerflightdetails.meals,
      ancillaryServices: passenger.passengerflightdetails.ancillaryServices,
      seatPref: passenger.passengerflightdetails.seatPref,
      seat_number: passenger.passengerflightdetails.seat_number,
  });
    const dialogRef = this.dialog.open(EditDetailsDialogComponent, {
      width: 'auto',
      data: {
        passengerForm,
        passengerID: passenger.passengerflightdetails.passengerID,
        passenger
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
      if (result.value !== undefined) {
      if (this.userrole === 2) {
      passenger.address = result.value.address;
      passenger.passport = result.value.passport;
      passenger.passengerflightdetails.wheelchair = result.value.wheelchair;
      passenger.passengerflightdetails.infants = result.value.infants;
      passenger.passengerflightdetails.meals = result.value.meals;
      passenger.passengerflightdetails.ancillaryServices = result.value.ancillaryServices;
      passenger.passengerflightdetails.seat_number = result.value.seat_number;
      this.service.updatePassengerbookingdetails(passenger);
      const snackBarRef = this.snackBar.open('Details Successfully updated for ' + passenger.name, 'Close');
    }
      if (this.userrole === 1) {
      passenger.name = result.value.Name;
      passenger.passport = result.value.passport;
      passenger.address = result.value.address;
      this.service.updatePassengerbookingdetails(passenger);
      const snackBarRef = this.snackBar.open('Details Successfully updated for ' + passenger.name, 'Close');
    }
    }}});

  }
  openAddItemDialog(passenger: Passengerbookingdetails) {
    const dialogRef = this.dialog.open(AddItemsDialogComponent, {
      width: 'auto',
      data: {
        passenger
      }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}



