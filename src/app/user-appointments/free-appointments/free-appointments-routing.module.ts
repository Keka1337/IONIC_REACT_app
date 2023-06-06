import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreeAppointmentsPage } from './free-appointments.page';

const routes: Routes = [
  {
    path: '',
    component: FreeAppointmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreeAppointmentsPageRoutingModule {}
