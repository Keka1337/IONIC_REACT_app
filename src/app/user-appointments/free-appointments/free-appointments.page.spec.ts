import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FreeAppointmentsPage } from './free-appointments.page';

describe('FreeAppointmentsPage', () => {
  let component: FreeAppointmentsPage;
  let fixture: ComponentFixture<FreeAppointmentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FreeAppointmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
