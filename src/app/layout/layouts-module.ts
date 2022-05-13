import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../_shared/shared.module';
import { NgModule } from '@angular/core';
import { EditProfileDialogComponent } from './header/edit-profile-dialog';
import { FirebaseLoginService } from '../firebaseServices/firebase-login.service';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
        declarations: [
            HeaderComponent,
            FooterComponent,
            EditProfileDialogComponent
        ],
        imports: [
          RouterModule,
          AngularFireAuthModule,
          SharedModule
        ],
      exports: [
        HeaderComponent,
        FooterComponent,
        EditProfileDialogComponent
      ],
      providers: [
        FirebaseLoginService
      ]
      })
      export class LayoutsModule {}
