import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  inject,
  signal
} from '@angular/core';

import { tap } from 'rxjs';

import { Constants } from '../../../../constants';

import { API_CONSTANTS }
  from '../../../../injectors/common-injector';

import {
  AngelOneLoginData
} from '../models/angel-one-login-response';

import { Gainer }
  from '../models/gainer';
import { DashboardSummary } from '../models/dashboard-summary';

@Injectable({
  providedIn: 'root'
})
export class AngelOneService {

  readonly #http =
    inject(HttpClient);

  readonly #api =
    inject(API_CONSTANTS);

  // ---------- Signals ----------

  gainers =
    signal<Gainer[]>([]);

  availableCash =
    signal(0);

  strategy =
    signal('');

  autoTrading =
    signal(false);

  dailyTrades =
    signal(0);

  dailyLoss =
    signal(0);

  killSwitch =
    signal(false);

  // ---------- Tokens ----------

  get token(): string | null {

    return localStorage.getItem(

      Constants.angelOneAccessToken
    );
  }

  set token(
    value: string | null
  ) {

    localStorage.setItem(

      Constants.angelOneAccessToken,

      value ?? ''
    );
  }

  get refreshToken(): string | null {

    return localStorage.getItem(

      Constants.angelOneRefreshToken
    );
  }

  set refreshToken(
    value: string | null
  ) {

    localStorage.setItem(

      Constants.angelOneRefreshToken,

      value ?? ''
    );
  }

  get feedToken(): string | null {

    return localStorage.getItem(

      Constants.angelOneFeedToken
    );
  }

  set feedToken(
    value: string | null
  ) {

    localStorage.setItem(

      Constants.angelOneFeedToken,

      value ?? ''
    );
  }

  // ---------- Auth ----------

  isLoggedIn(): boolean {

    return !!this.token;
  }

  loginToAngel() {

    return this.#http

      .get<AngelOneLoginData>(

        this.#api.getUrl(

          this.#api.loginToAngelOne,

          true
        )
      )

      .pipe(

        tap(response => {

          if (!response) {
            return;
          }

          this.token =
            response.jwtToken;

          this.refreshToken =
            response.refreshToken;

          this.feedToken =
            response.feedToken;
        })
      );
  }

  refreshJwtToken() {

    return this.#http.post(

      this.#api.getUrl(

        this.#api.refreshAngelToken,

        true
      ),

      {}
    );
  }

  logout() {

    localStorage.removeItem(

      Constants.angelOneAccessToken
    );

    localStorage.removeItem(

      Constants.angelOneRefreshToken
    );

    localStorage.removeItem(

      Constants.angelOneFeedToken
    );
  }

  // ---------- Dashboard ----------

  getDashboardSummary() {

    return this.#http

      .get<DashboardSummary>(

        this.#api.getUrl(

          this.#api.dashboardSummary,

          true
        )
      )

      .pipe(

        tap(summary => {

          this.availableCash.set(

            summary.availableCash
          );

          this.strategy.set(

            summary.strategy
          );

          this.autoTrading.set(

            summary.autoTradingEnabled
          );

          this.dailyTrades.set(

            summary.dailyTrades
          );

          this.dailyLoss.set(

            summary.dailyLoss
          );

          this.killSwitch.set(

            summary.killSwitch
          );
        })
      );
  }

  // ---------- Gainers ----------

  getTopGainers() {

    return this.#http

      .get<Gainer[]>(

        this.#api.getUrl(

          this.#api.gainers,

          true
        )
      )

      .pipe(

        tap(data => {

          this.gainers.set(
            data
          );
        })
      );
  }

  // ---------- Wallet ----------

  getAvailableCash() {

    return this.#http.get<number>(

      this.#api.getUrl(

        this.#api.getAvailableCash,

        true
      )
    );
  }

  // ---------- Holdings ----------

  getOwnedHoldings() {

    return this.#http.get<string[]>(

      this.#api.getUrl(

        this.#api.ownedHoldings,

        true
      )
    );
  }

  // ---------- Auto Trading ----------

  enableAutoTrading() {

    return this.#http.post(

      this.#api.getUrl(

        this.#api.enableAutoTrading,

        true
      ),

      {}
    );
  }

  disableAutoTrading() {

    return this.#http.post(

      this.#api.getUrl(

        this.#api.disableAutoTrading,

        true
      ),

      {}
    );
  }

  // ---------- Strategy ----------

  updateStrategy(
    strategy:
    'Momentum'
    | 'Pullback'
  ) {

    return this.#http.post(

      this.#api.getUrl(

        this.#api.updateStrategy,

        true
      ),

      {
        strategy
      }
    );
  }
}