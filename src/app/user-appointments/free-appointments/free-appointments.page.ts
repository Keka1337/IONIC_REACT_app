import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/appointments/appointments.model';
import { AppointmentsService } from 'src/app/appointments/appointments.service';

@Component({
  selector: 'app-free-appointments',
  templateUrl: './free-appointments.page.html',
  styleUrls: ['./free-appointments.page.scss'],
})
export class FreeAppointmentsPage implements OnInit, OnDestroy {
  appointments: Appointment[];
  private appointmentSub: Subscription;

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit() {
    this.appointmentSub = this.appointmentsService
      .getAppointments()
      .subscribe((appointments) => {
        this.appointments = appointments;
      });
  }

  ngOnDestroy() {
    if (this.appointmentSub) {
      this.appointmentSub.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.appointmentsService.getAppointments().subscribe((appointments) => {
      console.log(appointments);
    });
  }
}
