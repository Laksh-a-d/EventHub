import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';

import { Dashboard } from './features/dashboard/dashboard';

import { Events } from './features/events/events/events';

import { AddEvent } from './features/events/add-event/add-event';

import { EditEvent } from './features/events/edit-event/edit-event';

import { RegisterEvent } from './features/events/register-event/register-event';

import { MyRegistrations } from './features/events/my-registrations/my-registrations';


export const routes: Routes = [

  // ============================
  // DEFAULT
  // ============================

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },


  // ============================
  // LOGIN
  // ============================

  {
    path: 'login',
    component: Login
  },


  // ============================
  // DASHBOARD
  // ============================

  {
    path: 'dashboard',
    component: Dashboard
  },


  // ============================
  // EVENTS LIST
  // ============================

  {
    path: 'events',
    component: Events
  },


  // ============================
  // ADD EVENT
  // ============================

  {
    path: 'events/add',
    component: AddEvent
  },


  // ============================
  // EDIT EVENT
  // ============================

  {
    path: 'events/edit/:id',
    component: EditEvent
  },


  // ============================
  // REGISTER EVENT
  // ============================

  {
    path: 'events/register/:id',
    component: RegisterEvent
  },


  // ============================
  // MY REGISTRATIONS
  // ============================

  {
    path: 'events/my-registrations',
    component: MyRegistrations
  },


  // ============================
  // FALLBACK
  // ============================

  {
    path: '**',
    redirectTo: 'dashboard'
  }

];