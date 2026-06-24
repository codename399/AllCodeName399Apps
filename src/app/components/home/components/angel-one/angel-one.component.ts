import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  CommonModule,
  DecimalPipe
} from '@angular/common';

import { AngelOneService }
  from '../../services/angel-one.service';

import { MarketService }
  from '../../services/market.service';

import { ToastService }
  from '../../../../services/toast.service';

import { Gainer }
  from '../../models/gainer';

@Component({
  selector: 'app-angel-one',

  standalone: true,

  imports: [
    DecimalPipe,
    CommonModule
  ],

  templateUrl:
    './angel-one.component.html',

  styleUrl:
    './angel-one.component.css'
})

export class AngelOneComponent
  implements OnInit, OnDestroy {

  readonly #angel =
    inject(AngelOneService);

  readonly #market =
    inject(MarketService);

  readonly #toast =
    inject(ToastService);

  // ---------------- Dashboard ----------------

  gainers =
    signal<Gainer[]>([]);

  marketStatus =
    signal('');

  marketTimer =
    signal('');

  availableCash =
    signal(0);

  strategy =
    signal('Pullback');

  autoTradingEnabled =
    signal(false);

  dailyTrades =
    signal(0);

  dailyLoss =
    signal(0);

  killSwitch =
    signal(false);

  searchText =
    signal('');

  private timerId: any;

  // ---------------- Filter ----------------

  filteredGainers =
    computed(() => {

      const search =

        this.searchText()

        .trim()

        .toLowerCase();

      if (!search) {

        return this.gainers();
      }

      return this.gainers()

        .filter(x =>

          x.symbol

          .toLowerCase()

          .includes(search));
    });

  // ---------------- Lifecycle ----------------

  ngOnInit(): void {

    this.startMarketTimer();

    if (!this.#angel.isLoggedIn()) {

      this.loginToAngel();

      return;
    }

    this.loadDashboard();

  }

  ngOnDestroy(): void {

    if (this.timerId) {

      clearInterval(
        this.timerId
      );
    }
  }

  // ---------------- Login ----------------

  loginToAngel(): void {

    this.#angel

      .loginToAngel()

      .subscribe({

        next: () => {

          this.#toast.success(

            'Angel One login successful'
          );

          this.loadDashboard();
        },

        error: () => {

          this.#toast.error(

            'Angel One login failed'
          );
        }
      });
  }

  // ---------------- Dashboard ----------------

  private loadDashboard(): void {

    this.loadWalletBalance();

    this.loadDashboardSummary();

    this.subscribeToGainers();
  }

  private loadDashboardSummary(): void {

    this.#angel

      .getDashboardSummary()

      .subscribe({

        next: summary => {

          this.strategy.set(

            summary.strategy
          );

          this.autoTradingEnabled.set(

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
        },

        error: () => {

          console.error(

            'Dashboard summary failed'
          );
        }
      });
  }

  loadWalletBalance(): void {

    this.#angel

      .getAvailableCash()

      .subscribe({

        next: amount => {

          this.availableCash.set(
            amount
          );
        },

        error: () => {

          this.#toast.error(

            'Unable to fetch wallet balance'
          );
        }
      });
  }

  subscribeToGainers(): void {

    this.#market

      .startConnection(

        data => {

          this.gainers.set(
            data
          );
        });
  }

  // ---------------- Timer ----------------

  private startMarketTimer(): void {

    this.updateMarketTimer();

    this.timerId =

      setInterval(() => {

        this.updateMarketTimer();

      }, 1000);
  }

  private updateMarketTimer(): void {

    const now = new Date();

    const day = now.getDay();

    const openTime =

      new Date();

    openTime.setHours(

      9,

      15,

      0,

      0);

    const closeTime =

      new Date();

    closeTime.setHours(

      15,

      30,

      0,

      0);

    // Weekend

    if (day === 0
      || day === 6)
    {
      this.marketStatus
        .set('CLOSED');

      const nextMonday =

        new Date(now);

      nextMonday.setDate(

        now.getDate()

        + (day === 0 ? 1 : 2)
      );

      nextMonday.setHours(

        9,

        15,

        0,

        0
      );

      this.marketTimer.set(

        `Opens in ${

          this.formatTime(

            nextMonday.getTime()

            - now.getTime()
          )
        }`
      );

      return;
    }

    // Before market

    if (now < openTime)
    {
      this.marketStatus
        .set('CLOSED');

      this.marketTimer.set(

        `Opens in ${

          this.formatTime(

            openTime.getTime()

            - now.getTime()
          )
        }`
      );

      return;
    }

    // Market open

    if (
      now >= openTime

      && now < closeTime
    ) {

      this.marketStatus
        .set('OPEN');

      this.marketTimer.set(

        `Closes in ${

          this.formatTime(

            closeTime.getTime()

            - now.getTime()
          )
        }`
      );

      return;
    }

    // Market closed

    this.marketStatus
      .set('CLOSED');

    const nextOpen =

      new Date(now);

    nextOpen.setDate(

      now.getDate()

      + 1
    );

    nextOpen.setHours(

      9,

      15,

      0,

      0
    );

    if (day === 5)
    {
      nextOpen.setDate(

        now.getDate()

        + 3
      );
    }

    this.marketTimer.set(

      `Opens in ${

        this.formatTime(

          nextOpen.getTime()

          - now.getTime()
        )
      }`
    );
  }

  private formatTime(
    ms: number
  ): string {

    const total =

      Math.floor(
        ms / 1000
      );

    const hours =

      Math.floor(
        total / 3600
      );

    const minutes =

      Math.floor(
        (total % 3600)
        / 60
      );

    const seconds =

      total % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }
}