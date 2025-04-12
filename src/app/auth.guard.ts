import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token'); // ou ta logique d'auth

  if (!isLoggedIn) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
