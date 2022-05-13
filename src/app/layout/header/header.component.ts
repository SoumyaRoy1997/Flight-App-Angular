import { Component, OnInit, ChangeDetectorRef , ViewChild,  OnDestroy} from '@angular/core';
import {AuthenticationService} from '../../_services';
import {Admin} from '../../_models/entity';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import { Subscription, from } from 'rxjs';
import {SideNavService} from '../side-nav.service';
import {MatDialog} from '@angular/material/dialog';
import { EditProfileDialogComponent } from './edit-profile-dialog';
import { FirebaseLoginService } from 'src/app/firebaseServices/firebase-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor( private authenticationService: AuthenticationService, private sideNavService: SideNavService, public dialog: MatDialog,
               changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public firebaseService: FirebaseLoginService) {
               this.mobileQuery = window.matchMedia('(max-width: 600px)');
               this.mobileQueryListener = () => changeDetectorRef.detectChanges();
               this.mobileQuery.addEventListener('change', () => {
               this.mobileQueryListener();
            });
   }
  mobileQuery: MediaQueryList;
  isAuthenticated = false;
  Adminrole = false;
  user: Admin;
   private mobileQueryListener: () => void;
   @ViewChild('snav') sidenav: MatSidenav;
   private userSub: Subscription;
   isStaff = false;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
   clickMenu() {
    this.sidenav.toggle();
  }
   ngOnInit() {

     this.userSub = this.authenticationService.currentUserSubject.subscribe(user => {
      this.isAuthenticated = !!user;
      this.user = user;
     });

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', () => {
      this.mobileQueryListener();
   });
    this.userSub.unsubscribe();
  }
  logoutUser() {
    this.authenticationService.logout();
    this.firebaseService.currentUserSubject.subscribe(user => {
      if (user) {
        this.firebaseService.SignOut();
      }
    });
  }
  openEditDialog() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: 'auto',
      data: {
              Admin: this.user
           }});

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
