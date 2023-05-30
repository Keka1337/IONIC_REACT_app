import { Component, Input, OnInit } from '@angular/core';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Appointment } from '../appointments.model';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  @Input() appointment!: Appointment;
  currentDate: Date = new Date();

  constructor(
    private alertCtrl: AlertController,
    private appointmentService: AppointmentsService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  onDeleteAppointment(appointment: Appointment) {
    if (this.appointment.free === true) {
      this.toastMessage(
        `It is not possible to delete this appointment because it has been reserved`
      );
    } else {
      this.alertCtrl
        .create({
          header: 'Deleting appointment',
          message: 'Are you sure you want to delete this appointment?',
          buttons: [
            {
              text: 'Delete',
              role: 'delete',
              handler: () => {
                this.appointmentService.deleteAppointment(appointment.id);
                this.navCtrl.navigateBack('/appoitnemnts');
              },
            },
            {
              text: 'Cencel',
              role: 'cancel',
              handler: () => {
                console.log('Cencelled.');
              },
            },
          ],
        })
        .then((alertEl) => {
          alertEl.present();
        });
    }
  }

  async toastMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
    });
    toast.present();
  }
}
