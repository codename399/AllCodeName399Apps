import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/services/authentication-service';
import { inject, Injectable } from '@angular/core';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  #authenticationService: AuthenticationService = inject(AuthenticationService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.#authenticationService.token;

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // Handle unauthorized error (e.g., redirect to login)
        }
        return throwError(() => err);
      })
    );
  }
}