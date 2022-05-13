import { MatFormFieldControl } from '@angular/material/form-field';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.html',
  styleUrls: ['./edit-profile-dialog.scss'],
  providers: [{provide: MatFormFieldControl , useExisting: EditProfileDialogComponent}]
 })
export class EditProfileDialogComponent implements OnInit {

  AdminForm: FormGroup = new FormGroup({
    Name: new FormControl(),
    Password: new FormControl(),
    ProfilePicture: new FormControl()
  });
  fileInfo: string;
  file: File;
  constructor(public dialogRef: MatDialogRef<HeaderComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {}
    ngOnInit() {
    this.AdminForm.patchValue({
      Password: this.data.Admin.password
    });
    }
    onFileSelect(input: HTMLInputElement): void {

      function formatBytes(bytes: number): string {
        const UNITS = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const factor = 1024;
        let index = 0;

        while (bytes >= factor) {
          bytes /= factor;
          index++;
        }

        return `${parseFloat(bytes.toFixed(2))} ${UNITS[index]}`;
      }

      this.file = input.files[0];
      this.fileInfo = `${this.file.name} (${formatBytes(this.file.size)})`;
    }
    UpdateProfile(Password: string) {
      console.log(Password);
      console.log(this.file);
      this.data.Admin.password = Password;
      this.data.Admin.profilepic = this.file;

    }
}
