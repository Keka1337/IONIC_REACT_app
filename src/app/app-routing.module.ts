import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full',
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./appointments/appointments/appointments.module').then(
        (m) => m.AppointmentsPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'appointment-details',
    loadChildren: () =>
      import(
        './appointments/appointment-details/appointment-details.module'
      ).then((m) => m.AppointmentDetailsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users/users.module').then((m) => m.UsersPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'user-details',
    loadChildren: () =>
      import('./users/user-details/user-details.module').then(
        (m) => m.UserDetailsPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./about-us/about-us.module').then((m) => m.AboutUsPageModule),
  },
  {
    path: 'coaches',
    loadChildren: () =>
      import('./coaches/coaches.module').then((m) => m.CoachesPageModule),
  },
  {
    path: 'log-in',
    loadChildren: () =>
      import('./auth/log-in/log-in.module').then((m) => m.LogInPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'user-appointments',
    loadChildren: () =>
      import('./user-appointments/user-appointments.module').then(
        (m) => m.UserAppointmentsPageModule
      ),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
