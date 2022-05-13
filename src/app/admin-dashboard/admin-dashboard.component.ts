import {MatTableDataSource} from '@angular/material/table';
import { Flights, IteMs, MeaLs, Services } from '../_models/entity';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {Component, ViewChild, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StaffDashboardFirebaseService } from '../firebaseServices/staff-dashboard-firebase.service';
import { AddPassengersComponent } from './add-passengers-dialog.component';
import { EditFlightDetailsAdminDialogComponent } from './edit-flight-details-admin-dialog.component';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [DatePipe]
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['Company', 'Departure', 'Arrival', 'Passenger' , 'Destination' , 'Pickup' , 'Actions' ];
  Flight: Flights[];
  resultsLength = 0;
  filteredresultsLength = 0;
  isLoadingResults = true;
  fliteredFlight: Flights[];
  filter = true;
  flightID = [];
  passenger = [];
  barchart = [];
  currentDate = new Date();
  today: string;
  dataSource = new MatTableDataSource<Flights>(this.Flight);
  constructor(private router: Router,
              private datePipe: DatePipe,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private firebaseService: StaffDashboardFirebaseService) {
                window.location.hash = '/#/';
                window.location.hash = 'No-back-button';
                window.onhashchange = () => {window.location.hash = '/#/'; };
              }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.firebaseService.getFlights().subscribe(
          data => {
            this.Flight = data;
            this.Flight.forEach(value => {
              this.flightID.push(value.flightId);
              this.passenger.push(value.passengers);
            });
            this.resultsLength = this.Flight.length;
            this.dataSource = new MatTableDataSource<Flights>(this.Flight);
            this.isLoadingResults = false;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
  }
  onClick(FlightID: string, date: Date) {
    localStorage.removeItem('FlightID');
    localStorage.setItem('FlightID', FlightID);
    localStorage.removeItem('disable');
    if (date > this.currentDate) {
    localStorage.setItem('disable', 'false');
    }
    this.router.navigateByUrl('/Passengerdetails');
    }
    openEditDialog(Flight: Flights) {
      const dialogRef = this.dialog.open(EditFlightDetailsAdminDialogComponent, {
        width: 'auto',
        data: {
                flight: Flight
             }});

      dialogRef.afterClosed().subscribe(result => {
      });
    }

    openAddPassengerDialog(Flight: Flights) {
      if (Flight.passengers < Flight.limitpassengers) {
      const dialogRef = this.dialog.open(AddPassengersComponent, {
        width: 'auto',
        data: {
                flight: Flight
             }});

      dialogRef.afterClosed().subscribe(result => {
      });
    } else {
      const snackBarRef = this.snackBar.open('Flight: ' + Flight.flightId + ' is Full', 'Close');
    }
    }
}


