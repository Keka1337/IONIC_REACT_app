import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAppointmentsPage } from './user-appointments.page';

describe('UserAppointmentsPage', () => {
  let component: UserAppointmentsPage;
  let fixture: ComponentFixture<UserAppointmentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserAppointmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
