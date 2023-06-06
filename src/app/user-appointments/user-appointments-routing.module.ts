import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAppointmentsPage } from './user-appointments.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: UserAppointmentsPage,
    children: [
      {
        path: 'free-appointments',
        loadChildren: () =>
          import(
            'src/app/user-appointments/free-appointments/free-appointments.module'
          ).then((m) => m.FreeAppointmentsPageModule),
      },
      {
        path: 'my-appointments',
        loadChildren: () =>
          import(
            'src/app/user-appointments/my-appointments/my-appointments.module'
          ).then((m) => m.MyAppointmentsPageModule),
      },
      {
        path: '',
        redirectTo: '/my-appointments/tabs/my-appointments',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/user-appointments/tabs/my-appointments',
    pathMatch: 'full',
  },
  {
    path: 'my-appointments',
    loadChildren: () =>
      import('./my-appointments/my-appointments.module').then(
        (m) => m.MyAppointmentsPageModule
      ),
  },
  {
    path: 'free-appointments',
    loadChildren: () =>
      import('./free-appointments/free-appointments.module').then(
        (m) => m.FreeAppointmentsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAppointmentsPageRoutingModule {}
