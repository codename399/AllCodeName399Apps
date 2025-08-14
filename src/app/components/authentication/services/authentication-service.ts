import { inject, Injectable, signal } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { User } from '../models/user';
import { ApiConstants } from '../../../../api-constants';
import { Constants } from '../../../../constants';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  #httpClient = inject(HttpClient);
  #user = signal<User | null>(null);
  #route = inject(Router);

  get token() {
    return sessionStorage.getItem(Constants.token);
  }

  set token(value: string | null) {
    sessionStorage.setItem(Constants.token, value ?? '');
  }

  get userId() {
    return sessionStorage.getItem(Constants.userId);
  }

  set userId(value: string | null) {
    sessionStorage.setItem(Constants.userId, value ?? '');
  }

  get user() {
    return this.#user();
  }

  set user(value: User | null) {
    this.#user.set(value);
  }

  clearToken() {
    sessionStorage.clear();
    this.#user.set(null);
  }

  isLoggedIn(): boolean {
    return this.token !== '' && this.token !== null;
  }

  logout() {
    this.clearToken();
    this.#route.navigate(['/login']);
  }

  validateUser(loginRequest: LoginRequest) {
    return this.#httpClient
      .post<LoginResponse>(
        ApiConstants.getUrl(ApiConstants.validateUser, true),
        loginRequest
      )
      .pipe(
        tap((response) => {
          if (response?.token) {
            this.userId = response.userId;
            this.token = response.token;
          }
        })
      );
  }
}
