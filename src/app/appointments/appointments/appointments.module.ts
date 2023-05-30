import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentsPageRoutingModule } from './appointments-routing.module';

import { AppointmentsPage } from './appointments.page';
import { AppointmentComponent } from '../appointment/appointment.component';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentsPageRoutingModule,
  ],
  declarations: [
    AppointmentsPage,
    AppointmentComponent,
    AppointmentModalComponent,
  ],
})
export class AppointmentsPageModule {}
