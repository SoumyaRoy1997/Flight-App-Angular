import { Component, OnInit , Output, EventEmitter , Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../_services';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';
import { FirebaseLoginService } from '../firebaseServices/firebase-login.service';
import { Admin } from '../_models/entity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public loginInvalid: boolean;
  hide = true;
  private route: ActivatedRoute;
  constructor(private fb: FormBuilder,
              private firebaseLoginService: FirebaseLoginService,
              private authService: AuthenticationService,
              private router: Router) {
  }

  public Admins: Admin;
  username = '';
  password = '';
  loading = false;
  error = '';

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });


  }
  googlesignin() {
    this.firebaseLoginService.getAdminData().subscribe((data) => {
      data = data.filter(admin => admin.adminID.localeCompare('Admin') === 0);
      this.authService.login(data[0]);
    });
    this.firebaseLoginService.googleSignin().then(res => {
      if (res.user) {
          Swal.fire('Successfully Logged in as: ' , res.user.displayName + ' with Admin previleges', 'success');
          this.loading = false;
          this.router.navigateByUrl('AdminDashboard');
      } else {
        this.authService.logout();
      }
    });

  }
  onSubmitFirebase(username: any , password: any) {
    const flag = true;
    this.loading = true;
    this.firebaseLoginService.getAdminData().subscribe((data) => {
      data = data.filter(admin => admin.adminID.localeCompare(username) === 0);
      if (data.length === 0) {
        this.loading = false;
        Swal.fire('Invalid Username', 'Check your Input', 'error');
      } else {
        if (data[0].password.localeCompare(password) === 0 && data[0].role === 2) {
          this.authService.login(data[0]);
          Swal.fire('Successfully Logged In as: ' , username, 'success');
          this.loading = false;
          this.router.navigateByUrl('StaffDashboard');
        } else if (data[0].password.localeCompare(password) === 0 && data[0].role === 1) {
          this.authService.login(data[0]);
          Swal.fire('Successfully Logged In as: ' , username, 'success');
          this.loading = false;
          this.router.navigateByUrl('AdminDashboard');
        } else {
          this.loading = false;
          Swal.fire('Invalid Password', 'Check your Input', 'error');
        }
      }
    });
  }
}
