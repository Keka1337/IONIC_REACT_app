import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/appointments/appointments.model';
import { AppointmentsService } from 'src/app/appointments/appointments.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserAuth } from 'src/app/auth/UserAuth';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.page.html',
  styleUrls: ['./my-appointments.page.scss'],
})
export class MyAppointmentsPage implements OnInit, OnDestroy {
  reservations: Reservation[];
  termin: Appointment;
  user: UserAuth;
  private sub: Subscription;

  constructor(
    private rezervacijeService: ReservationService,
    private appointmentsService: AppointmentsService,
    private authService: AuthService
  ) {
    this.user = authService.currentUser;
  }

  ngOnInit() {
    this.sub = this.rezervacijeService.reservations.subscribe(
      (reservations) => {
        this.reservations = reservations;
      }
    );
  }

  ionViewWillEnter() {
    this.rezervacijeService
      .getReservations(this.user.email)
      .subscribe((reservations) => {});
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
