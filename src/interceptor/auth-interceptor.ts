import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/services/authentication-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authenticationService = inject(AuthenticationService);
  let token: string = authenticationService.token ?? '';

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      return throwError(() => error);
    })
  );
};
