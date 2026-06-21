import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Constants } from '../../../../constants';
import { API_CONSTANTS } from '../../../../injectors/common-injector';
import { AngelOneLoginData, AngelOneLoginResponse } from '../models/angel-one-login-response';
import { User } from '../models/user';
import { Gainer } from '../models/gainer';

@Injectable({
    providedIn: 'root',
})
export class AngelOneService {
    #httpClient = inject(HttpClient);
    #user = signal<User | null>(null);
    #route = inject(Router);
    #apiConstants = inject(API_CONSTANTS);

    get token() {
        return localStorage.getItem(Constants.angelOneAccessToken);
    }

    set token(value: string | null) {
        localStorage.setItem(Constants.angelOneAccessToken, value ?? '');
    }

    get refreshToken() {
        return localStorage.getItem(Constants.angelOneRefreshToken);
    }

    set refreshToken(value: string | null) {
        localStorage.setItem(Constants.angelOneRefreshToken, value ?? '');
    }

    get feedToken() {
        return localStorage.getItem(Constants.angelOneFeedToken);
    }

    set feedToken(value: string | null) {
        localStorage.setItem(Constants.angelOneFeedToken, value ?? '');
    }

    isLoggedIn(): boolean {
        return this.token !== '' && this.token !== null;
    }

    loginToAngel() {
        return this.#httpClient
            .get<AngelOneLoginData>(
                this.#apiConstants.getUrl(this.#apiConstants.loginToAngelOne, true)
            )
            .pipe(
                tap((response) => {
                    if (response) {
                        this.token = response.jwtToken;
                        this.refreshToken = response.refreshToken;
                        this.feedToken = response.feedToken;
                    }
                })
            );
    }

    gainers(){
        return this.#httpClient
            .get<Gainer[]>(
                this.#apiConstants.getUrl(this.#apiConstants.gainers, true)
            )
            .pipe();
    }
}