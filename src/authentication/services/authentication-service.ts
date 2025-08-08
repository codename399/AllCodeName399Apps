import { inject, Injectable, signal } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Constants } from '../../constants';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
#httpClient = inject(HttpClient);
  #token = signal<string | null>(null);

  get token() {
    return this.#token();
  }

  set token(value: string | null) {
    this.#token.set(value);
  }

  clearToken() {
    this.#token.set(null);
  }

  isLoggedIn(): boolean {
    return this.#token() !== null;
  }

  validateUser(loginRequest:LoginRequest){
    return this.#httpClient.post<LoginResponse>(Constants.getUrl(Constants.validateUser, true), loginRequest).pipe(
      tap((response) => {
        if(response?.token) {
          this.token = response.token;
        }
      })
    );
  }
}
