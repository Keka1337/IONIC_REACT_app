import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.scss'],
})
export class AppointmentModalComponent implements OnInit {
  @ViewChild('dodajTerminForma', { static: true }) form!: NgForm;
  @Input() title!: string;
  currentDate!: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.currentDate = new Date().toISOString();
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddAppointment() {
    if (!this.form.valid) {
      return;
    }
    this.modalCtrl.dismiss(
      { appointmentData: { datum: this.form.value['date'] } },
      'confirm'
    );
  }
}
