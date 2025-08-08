import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/services/authentication-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = new AuthenticationService();
  const token = authenticationService.token;

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        // Handle unauthorized error (e.g., redirect to login)
      }
      return throwError(() => err);
    })
  );
};
