import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { Appointment } from '../appointments.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  appointments = [
    { id: '1', date: new Date(500000000000), free: true },
    { id: '2', date: new Date(500000000000), free: true },
    { id: '3', date: new Date(500000000000), free: true },
    { id: '4', date: new Date(500000000000), free: true },
    { id: '5', date: new Date(500000000000), free: true },
  ];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

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
          //TO DO: spoziv ka servisu da doda novi appointment
        }
      });
  }
}
