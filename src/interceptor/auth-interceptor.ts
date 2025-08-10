import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/services/authentication-service';
import { LoaderService } from '../app/services/loader.service';
import { ToastService } from '../app/services/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authenticationService = inject(AuthenticationService);
  let loaderService = inject(LoaderService);
  let toastService = inject(ToastService);
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
      loaderService.hide();
      toastService.error(error);
      
      return throwError(() => error);
    })
  );
};
