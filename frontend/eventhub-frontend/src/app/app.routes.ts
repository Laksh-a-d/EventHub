import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { Events } from './features/events/events/events';
import { AddEvent } from './features/events/add-event/add-event';
import { EditEvent } from './features/events/edit-event/edit-event';
import { RegisterEvent } from './features/events/register-event/register-event';
import { MyRegistrations } from './features/events/my-registrations/my-registrations';
import { AdminUsers } from './features/admin/users/users';
import { AdminRegistrations } from './features/admin/registrations/registrations';

import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

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
  // DASHBOARD (ADMIN ONLY)
  // ============================

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard, adminGuard]
  },


  // ============================
  // EVENTS LIST (AUTHENTICATED)
  // ============================

  {
    path: 'events',
    component: Events,
    canActivate: [authGuard]
  },


  // ============================
  // ADD EVENT (ADMIN ONLY)
  // ============================

  {
    path: 'events/add',
    component: AddEvent,
    canActivate: [authGuard, adminGuard]
  },


  // ============================
  // EDIT EVENT (ADMIN ONLY)
  // ============================

  {
    path: 'events/edit/:id',
    component: EditEvent,
    canActivate: [authGuard, adminGuard]
  },


  // ============================
  // REGISTER EVENT (AUTHENTICATED)
  // ============================

  {
    path: 'events/register/:id',
    component: RegisterEvent,
    canActivate: [authGuard]
  },


  // ============================
  // MY REGISTRATIONS (AUTHENTICATED)
  // ============================

  {
    path: 'events/my-registrations',
    component: MyRegistrations,
    canActivate: [authGuard]
  },

  {
    path: 'my-registrations',
    redirectTo: 'events/my-registrations',
    pathMatch: 'full'
  },


  // ============================
  // ADMIN USERS (ADMIN ONLY)
  // ============================

  {
    path: 'admin/users',
    component: AdminUsers,
    canActivate: [authGuard, adminGuard]
  },


  // ============================
  // ADMIN REGISTRATIONS (ADMIN ONLY)
  // ============================

  {
    path: 'admin/registrations',
    component: AdminRegistrations,
    canActivate: [authGuard, adminGuard]
  },


  // ============================
  // FALLBACK
  // ============================

  {
    path: '**',
    redirectTo: 'login'
  }

];