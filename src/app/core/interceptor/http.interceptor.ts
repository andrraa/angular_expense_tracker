import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../../shared/services/storage/storage.service';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const storage = inject(StorageService);

  if (!req.url.includes('auth')) {
    const token = storage.getToken('token');

    if (token != null) {
      return next(
        req.clone({
          headers: req.headers.set('Authorization', token),
        })
      );
    }
  }

  return next(req);
};
