import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storage = inject(StorageService);

  const token = storage.getToken('token');

  if (token != null) {
    if (state.url.includes('auth')) {
      router.navigateByUrl('/home/dashboard');
      return false;
    }

    return true;
  } else {
    if (state.url.includes('auth')) {
      return true;
    }

    return false;
  }
};
