import { Component } from '@angular/core';
import {AuthenticationService} from './_services';
import { Subscription, from } from 'rxjs';
import {OnInit, OnDestroy} from '@angular/core';
import { Admin } from './_models/entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Flight-App';
  isAuthenticated: boolean;
  private userSub: Subscription;
  user: Admin;
  constructor(public authenticationService: AuthenticationService) {

  }

 ngOnInit() {
  this.userSub = this.authenticationService.currentUserSubject.subscribe(user => {
    this.isAuthenticated = !!user;
   });
  if (this.isAuthenticated) {
    if (window.location.pathname.localeCompare('/login') === 0 || window.location.pathname.localeCompare('/') === 0) {
       this.authenticationService.logout();
     }
   }
  }
ngOnDestroy(): void {

  this.userSub.unsubscribe();
}
}
