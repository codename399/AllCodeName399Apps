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

import { DashboardSummary }
  from '../models/dashboard-summary';

import { Gainer }
  from '../models/gainer';
import { TradingConfiguration } from '../models/trading-configruation';

@Injectable({
  providedIn: 'root'
})
export class AngelOneService {

  readonly #http =
    inject(HttpClient);

  readonly #api =
    inject(API_CONSTANTS);

  // ======================================================
  // Signals
  // ======================================================

  gainers =
    signal<Gainer[]>([]);

  availableCash =
    signal(0);

  configuration =
    signal<TradingConfiguration | null>(null);

  // ======================================================
  // Token Helpers
  // ======================================================

  get token(): string | null {

    return localStorage.getItem(
      Constants.angelOneAccessToken
    );

  }

  set token(
    value: string | null
  ) {

    if (value) {

      localStorage.setItem(
        Constants.angelOneAccessToken,
        value
      );

      return;

    }

    localStorage.removeItem(
      Constants.angelOneAccessToken
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

    if (value) {

      localStorage.setItem(
        Constants.angelOneRefreshToken,
        value
      );

      return;

    }

    localStorage.removeItem(
      Constants.angelOneRefreshToken
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

    if (value) {

      localStorage.setItem(
        Constants.angelOneFeedToken,
        value
      );

      return;

    }

    localStorage.removeItem(
      Constants.angelOneFeedToken
    );

  }

  // ======================================================
  // Authentication
  // ======================================================

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

    this.token = null;

    this.refreshToken = null;

    this.feedToken = null;

    this.configuration.set(null);

    this.availableCash.set(0);

    this.gainers.set([]);

  }

    // ======================================================
  // Dashboard
  // ======================================================

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

        })

      );

  }

  // ======================================================
  // Trading Configuration
  // ======================================================

  getTradingConfiguration() {

    return this.#http

      .get<TradingConfiguration>(

        this.#api.getUrl(

          this.#api.getConfiguration,

          true

        )

      )

      .pipe(

        tap(configuration => {

          this.configuration.set(
            configuration
          );

        })

      );

  }

  saveTradingConfiguration(
    configuration: TradingConfiguration
  ) {

    return this.#http

      .put<TradingConfiguration>(

        this.#api.getUrl(

          this.#api.setConfiguration,

          true

        ),

        configuration

      )

      .pipe(

        tap(configuration => {

          this.configuration.set(
            configuration
          );

        })

      );

  }

  // ======================================================
  // Market Scanner
  // ======================================================

  getTopGainers() {

    return this.#http

      .get<Gainer[]>(

        this.#api.getUrl(

          this.#api.gainers,

          true

        )

      )

      .pipe(

        tap(gainers => {

          this.gainers.set(
            gainers
          );

        })

      );

  }

  // ======================================================
  // Wallet
  // ======================================================

  getAvailableCash() {

    return this.#http.get<number>(

      this.#api.getUrl(

        this.#api.getAvailableCash,

        true

      )

    );

  }

  // ======================================================
  // Holdings
  // ======================================================

  getOwnedHoldings() {

    return this.#http.get<string[]>(

      this.#api.getUrl(

        this.#api.ownedHoldings,

        true

      )

    );

  }

  // ======================================================
  // Helpers
  // ======================================================

  reloadConfiguration() {

    return this.getTradingConfiguration();

  }

  reloadDashboard() {

    return this.getDashboardSummary();

  }

  get isAutoTradingEnabled(): boolean {

    return this.configuration()?.enableAutoTrading
      ?? false;

  }

  get selectedStrategy() {

    return this.configuration()?.strategy;

  }

  get riskPercentage(): number {

    return this.configuration()?.riskPercentage
      ?? 0;

  }

  get maxDailyTrades(): number {

    return this.configuration()?.maxDailyTrades
      ?? 0;

  }

  get scanIntervalSeconds(): number {

    return this.configuration()?.scanIntervalSeconds
      ?? 0;

  }

}