import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { CampsiteComponent } from './campsite/campsite.component';
import { ReservationsComponent } from './reservations/reservations.component';


const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,

  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'campsites/:id',
    component: CampsiteComponent
  },
  {
    path: 'reservations',
    component: ReservationsComponent
  },
  {
    path: '**',
    redirectTo: '/campsites',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
