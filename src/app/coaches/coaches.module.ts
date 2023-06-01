import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoachesPageRoutingModule } from './coaches-routing.module';

import { CoachesPage } from './coaches.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachesPageRoutingModule
  ],
  declarations: [CoachesPage]
})
export class CoachesPageModule {}
