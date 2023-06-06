import { Component, Input, OnInit } from '@angular/core';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Appointment } from 'src/app/appointments/appointments.model';
import { AppointmentsService } from 'src/app/appointments/appointments.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserAuth } from 'src/app/auth/UserAuth';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-user-appointment',
  templateUrl: './user-appointment.component.html',
  styleUrls: ['./user-appointment.component.scss'],
})
export class UserAppointmentComponent implements OnInit {
  @Input() appointment: Appointment;
  currentDate: Date = new Date();
  user: UserAuth;

  constructor(
    private alertCtrl: AlertController,
    private appointmentsService: AppointmentsService,
    private rezervacijeService: ReservationService,
    private authService: AuthService,
    navCtrl: NavController,
    private toastCtrl: ToastController
  ) {
    this.user = authService.currentUser;
  }

  ngOnInit() {}

  onMakeReservation() {
    if (this.appointment.date < this.currentDate) {
      this.toastMessage(`The selected date is not valid!`);
    } else if (this.appointment.free === false) {
      this.toastMessage(
        `This appointment is not available. Please, pick another one.`
      );
    } else {
      this.alertCtrl
        .create({
          header: 'Reservation',
          message: 'Are you sure you want to make this reservation?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Make Reservation',
              handler: () => {
                this.appointment.free = false;
                this.rezervacijeService
                  .makeReservation(this.appointment)
                  .subscribe(() => {
                    this.onEditAppointment();
                    this.toastMessage(`Your reservation has been made.`);
                  });
              },
            },
          ],
        })
        .then((alertEl) => {
          alertEl.present();
        });
    }
  }

  onEditAppointment() {
    this.appointmentsService
      .editAppointment(
        this.appointment.id,
        this.appointment.date,
        this.appointment.free
      )
      .subscribe((appointment) => {});
  }

  async toastMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
    });
    toast.present();
  }
}
