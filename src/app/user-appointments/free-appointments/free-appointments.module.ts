import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreeAppointmentsPageRoutingModule } from './free-appointments-routing.module';

import { FreeAppointmentsPage } from './free-appointments.page';
import { UserAppointmentComponent } from '../user-appointment/user-appointment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreeAppointmentsPageRoutingModule,
  ],
  declarations: [FreeAppointmentsPage, UserAppointmentComponent],
})
export class FreeAppointmentsPageModule {}
