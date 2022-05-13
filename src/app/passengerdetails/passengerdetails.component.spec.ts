import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerdetailsComponent } from './passengerdetails.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PassengerdetailsComponent', () => {
  let component: PassengerdetailsComponent;
  let fixture: ComponentFixture<PassengerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        RouterModule.forRoot([])
      ],
      declarations: [ PassengerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
