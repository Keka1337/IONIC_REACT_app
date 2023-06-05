import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Appointment } from '../appointments.model';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.page.html',
  styleUrls: ['./appointment-details.page.scss'],
})
export class AppointmentDetailsPage implements OnInit {
  appointment!: Appointment;
  selectedDate!: Date;
  currentDate!: string;

  constructor(private toastCtrl: ToastController) {}

  ngOnInit() {
    this.appointment = { id: '1', date: new Date(), free: true };
    this.currentDate = new Date().toISOString();
  }

  onEditAppointment() {
    if (this.appointment.free === false) {
      this.toastMessage(`You can not edit this appointment!`);
    } else {
      this.appointment.date = this.selectedDate;
      //TO DO: poziv ka servisu da edituje appointment
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
