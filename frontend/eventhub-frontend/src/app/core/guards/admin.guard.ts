import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  // If logged in as student, redirect to /events; if not logged in, redirect to /login
  if (authService.isLoggedIn()) {
    return router.createUrlTree(['/events']);
  }

  return router.createUrlTree(['/login']);
};
