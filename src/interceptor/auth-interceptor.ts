import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/services/authentication-service';
import { inject, Injectable } from '@angular/core';
import { LoaderService } from '../app/services/loader.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  #authenticationService: AuthenticationService = inject(AuthenticationService);
  #loaderService = inject(LoaderService);

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
        this.#loaderService.hide();
        return throwError(() => err);
      })
    );
  }
}