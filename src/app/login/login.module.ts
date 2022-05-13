import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from 'angularfire2';
import { SharedModule } from '../_shared/shared.module';
import { LoginComponent } from './login.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginRoutingModule } from './login-routing.module';
import { RouterModule } from '@angular/router';
import { FirebaseLoginService } from '../firebaseServices/firebase-login.service';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
      SharedModule,
      AngularFireAuthModule,
      LoginRoutingModule,
      RouterModule
    ],
  exports: [
    LoginComponent
  ],
  providers: [FirebaseLoginService]
  })
  export class LoginModule {}
