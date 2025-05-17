import { inject } from '@angular/core';
import { RouterService } from '../services';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('intelligent-token');
  const router = inject(RouterService).router;

  if (token) return true;

  router.navigate(['/login']);
  return false;
};
