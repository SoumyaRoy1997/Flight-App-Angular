import { ActivatedRoute, Router } from '@angular/router';
import {Component, ViewChild, AfterViewInit, Input, OnInit, ChangeDetectorRef, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DatePipe} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table';
import {Flights, Passengerflightdetails, Passengerbookingdetails } from '../_models/entity';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Chart } from 'chart.js';
import { StaffDashboardFirebaseService } from '../firebaseServices/staff-dashboard-firebase.service';
import { EditFlightDetailsDialogComponent } from './edit-flight-details-dialog.component';


@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss'],
  providers: [DatePipe],

})
export class StaffDashboardComponent implements OnInit {
  constructor(private router: Router,
              private datePipe: DatePipe,
              private firebaseService: StaffDashboardFirebaseService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.today = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd hh:mm:ss');
    window.location.hash = '/#/';
    window.location.hash = 'No-back-button';
    window.onhashchange = () => {window.location.hash = '/#/'; };
    }
  displayedColumns: string[] = ['Departure', 'Arrival', 'Passenger' , 'Destination' , 'Pickup' , 'Actions'];
  Flight: Flights[];
  passengerflightdetails: Passengerflightdetails[];
  resultsLength = 0;
  filteredresultsLength = 0;
  isLoadingResults = true;
  fliteredFlight: Flights[];
  filter = true;
  dataSource = new MatTableDataSource<Flights>(this.Flight);
  currentDate = new Date();
  today: string;
  fillerNav: Flights[];
  mobileQuery: MediaQueryList;
  opened = true;
  NotCheckedIn = 0;
  barchart = [];
  flightID = [];
  passenger = [];
  filteredDatasource = new MatTableDataSource<Flights>(this.Flight);
  passengerbookingdetails: Passengerbookingdetails[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  ngOnInit() {
    let item: string;
    if (localStorage.getItem('currentUser') !== null) {
    item = JSON.parse(localStorage.getItem('currentUser')).companyName;
    }
    this.firebaseService.getFlights().subscribe(
        data => {
          this.Flight = data.filter(values => values.company === item);
          this.Flight.forEach(value => {
            this.flightID.push(value.flightId);
            this.passenger.push(value.passengers);
          });
          this.dataSource = new MatTableDataSource<Flights>(this.Flight);
          this.isLoadingResults = false;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.resultsLength = this.Flight.length;


          this.fliteredFlight = this.Flight.filter(values => (new Date(values.departure)) >= this.currentDate);
          this.filteredDatasource = new MatTableDataSource<Flights>(this.fliteredFlight);
          this.filteredresultsLength = this.fliteredFlight.length;
          this.filteredDatasource.sort = this.sort;
          this.filteredDatasource.paginator = this.paginator;
          if (this.filteredresultsLength === 0) {
            this.filter = false;
          }
        }
      );

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
     openEditDialog(limit: number, Flight: Flights) {
        const passengercheckindetails = new Array();
        const Seats = new Array();
        const color = new Array();
        const wheelchair = new Array();
        const meals = new Array();
        const infants = new Array();
        let count = 0;
        this.firebaseService.getPassengerBookingdetails().subscribe(
          data => {
            this.passengerbookingdetails = data.filter(passenger => passenger.passengerflightdetails.flight.flightId === Flight.flightId);
            this.passengerbookingdetails.forEach(values => {
                if (values.passengerflightdetails.flight.flightId.localeCompare(Flight.flightId) === 0) {
               passengercheckindetails.push
               (values.passengerflightdetails.checkin,
               values.name,
               values.passengerflightdetails.seat_number);
              }
              });
            const seatArray: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
            let j = 0;
            const k = 0;
            let flagwheelchair = false;
            let flagmeals = false;
            let flaginfants = false;
            for (let i = 1; i <= Flight.limitpassengers; i++) {
             if (j === seatArray.length) {
                j = 0;
             }
             Seats.push(seatArray[j] + i);
             j++;
        }

            for (let i = 1; i <= Seats.length; i++) {
          this.passengerbookingdetails.forEach(element => {
          if (element.passengerflightdetails.wheelchair
          && element.passengerflightdetails.seat_number.localeCompare(Seats[i - 1]) === 0) {
                  color.push('coral');
                  wheelchair.push(true);
                  flagwheelchair = true;
                }
          if (element.passengerflightdetails.meals
                 && element.passengerflightdetails.seat_number.localeCompare(Seats[i - 1]) === 0) {
                  meals.push(true);
                  flagmeals = true;
                }
          if (element.passengerflightdetails.infants
                 && element.passengerflightdetails.seat_number.localeCompare(Seats[i - 1]) === 0) {
                    infants.push(true);
                    flaginfants = true;
                }
             });
          if (!flagwheelchair) {
               color.push('burlywood');
               wheelchair.push(false);
             }
          if (!flagmeals) {
              meals.push(false);
             }
          if (!flaginfants) {
              infants.push(false);
             }
          flaginfants = false;
          flagwheelchair = false;
          flagmeals = false;
            }
            if (count === 0) {
              count++;
              const dialogRef = this.dialog.open(EditFlightDetailsDialogComponent, {
              width: '800px',
              data: {
               limit,
               checkin: passengercheckindetails,
               flightID: Flight.flightId,
               Seats,
               color,
               wheelchair,
               meals,
               infants
              }
            });

              dialogRef.afterClosed().subscribe(result => {
              if (result !== undefined) {
              if (result.value !== undefined) {
              const length = result.value.seat_number.length;
              let flag = true;
              flag = true;
               // console.log(passengerflightdetails);
               // console.log(result.value.seat_number);
               // console.log(Seats);
              for (j = 0; j < this.passengerbookingdetails.length; j++) {
                     for (let i = 0; i < Seats.length; i++) {
                     if (this.passengerbookingdetails[j].passengerflightdetails.seat_number.search(Seats[i])
                     === 0
                     && this.passengerbookingdetails[j].passengerflightdetails.checkin
                     !== result.value.seat_number[i].checkin) {
                       // console.log('INSIDE IF: '+passengerflightdetails[j].seat_number.search(Seats[i]))
                       // console.log(passengerflightdetails[j].seat_number);
                       // console.log(Seats[i]);
                       this.passengerbookingdetails[j].passengerflightdetails.checkin = result.value.seat_number[i].checkin;
                       this.firebaseService.updatePassengerbookingdetails(this.passengerbookingdetails[j]);
                       const snackBarRef = this.snackBar.open(
                       'Flight Checkin Details Successfully updated for ' + Flight.flightId,
                       'Close');
                       flag = false;
                       break;
                      }
                   }
                     flag = true;
               }
             }
             }});
            }

          });
      }
}


