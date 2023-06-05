import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { Appointment } from '../appointments.model';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  appointments!: Appointment[];

  constructor(
    private modalCtrl: ModalController,
    private appointmentsService: AppointmentsService
  ) {}

  ngOnInit() {
    this.appointmentsService.getAppointments().subscribe((appointments) => {
      console.log(appointments);
      this.appointments = appointments;
    });
  }

  openModal() {
    this.modalCtrl
      .create({
        component: AppointmentModalComponent,
        componentProps: { title: 'Add Appointment' },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData) => {
        if (resultData.role === 'confirm') {
          console.log(resultData);
          this.appointmentsService
            .addAppointment(
              resultData.data.appointmentData.date,
              resultData.data.appointmentData.free
            )
            .subscribe((res) => {});
        }
      });
  }
}
