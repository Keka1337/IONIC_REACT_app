import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'appointments',
    pathMatch: 'full',
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./appointments/appointments/appointments.module').then(
        (m) => m.AppointmentsPageModule
      ),
  },
  {
    path: 'appointment-details',
    loadChildren: () =>
      import(
        './appointments/appointment-details/appointment-details.module'
      ).then((m) => m.AppointmentDetailsPageModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users/users.module').then((m) => m.UsersPageModule),
  },
  {
    path: 'user-details',
    loadChildren: () =>
      import('./users/user-details/user-details.module').then(
        (m) => m.UserDetailsPageModule
      ),
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./about-us/about-us.module').then((m) => m.AboutUsPageModule),
  },
  {
    path: 'coaches',
    loadChildren: () => import('./coaches/coaches.module').then( m => m.CoachesPageModule)
  },
  {
    path: 'log-in',
    loadChildren: () => import('./auth/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
