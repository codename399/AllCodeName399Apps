import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Constants } from '../../../../constants';
import { API_CONSTANTS } from '../../../../injectors/common-injector';
import { User } from '../../home/models/user';
import { GenerateSessionRequest } from '../models/generate-session-request';
import { GenerateSessionResponse } from '../models/generate-session-response';

@Injectable({
    providedIn: 'root',
})
export class KiteService {
    #httpClient = inject(HttpClient);
    #user = signal<User | null>(null);
    #route = inject(Router);
    #apiConstants = inject(API_CONSTANTS);

    get token() {
        return sessionStorage.getItem(Constants.token);
    }

    set token(value: string | null) {
        sessionStorage.setItem(Constants.token, value ?? '');
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

    generateSession(generateSessionRequest: GenerateSessionRequest) {
        return this.#httpClient
            .post<GenerateSessionResponse>(
                this.#apiConstants.getUrl(this.#apiConstants.generateSession, true),
                generateSessionRequest
            )
            .pipe(
                tap((response) => {
                    if (response?.data?.access_token) {
                        this.token = response?.data?.access_token;
                    }
                })
            );
    }
}