import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAppointmentsPageRoutingModule } from './user-appointments-routing.module';

import { UserAppointmentsPage } from './user-appointments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAppointmentsPageRoutingModule
  ],
  declarations: [UserAppointmentsPage]
})
export class UserAppointmentsPageModule {}
