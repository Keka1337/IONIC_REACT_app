import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Appointment } from '../appointments.model';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.page.html',
  styleUrls: ['./appointment-details.page.scss'],
})
export class AppointmentDetailsPage implements OnInit {
  appointment: Appointment;
  selectedDate: Date;
  currentDate: string;

  constructor(
    private toastCtrl: ToastController,
    private appointmentService: AppointmentsService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('appointmentId')) {
        this.navCtrl.navigateBack('/appointments');
        return;
      }
      this.appointmentService
        .getAppointment(paramMap.get('appointmentId')!)
        .subscribe((appointment) => {
          this.appointment = appointment;
          this.currentDate = new Date().toISOString();
          this.selectedDate = this.appointment.date;
        });
    });

    this.appointment = { id: '1', date: new Date(), free: true };
    this.currentDate = new Date().toISOString();
  }

  onEditAppointment() {
    if (this.appointment.free === false) {
      this.toastMessage(
        `You can not edit this appointment because it is reserved!`
      );
      return;
    } else {
      this.appointment.date = this.selectedDate;
      this.appointmentService
        .editAppointment(
          this.appointment.id,
          this.appointment.date,
          this.appointment.free
        )
        .subscribe((appointment) => {
          this.navCtrl.navigateBack('/appointments');
          this.toastMessage('Appointment is succesfully edited');
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
