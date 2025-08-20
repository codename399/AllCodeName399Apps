import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { LoaderService } from '../app/services/loader.service';
import { ToastService } from '../app/services/toast.service';
import { AuthenticationService } from '../app/components/authentication/services/authentication-service';
import { jwtDecode } from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authenticationService = inject(AuthenticationService);
  let loaderService = inject(LoaderService);
  let toastService = inject(ToastService);
  let token: string = authenticationService.token ?? '';

  loaderService.show();

  if (token) {
    const decodedToken: any = jwtDecode(token);
    const exp = decodedToken.exp * 1000;

    if (Date.now() >= exp) {
      authenticationService.logout();
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      loaderService.hide();
      toastService.error(error.error.message);

      return throwError(() => error);
    }),
    finalize(() => loaderService.hide())
  );
};
