import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  computed
} from '@angular/core';

import {
  CommonModule,
  DecimalPipe
} from '@angular/common';

import { AngelOneService } from '../../services/angel-one.service';
import { MarketService } from '../../services/market.service';
import { ToastService } from '../../../../services/toast.service';
import { Gainer } from '../../models/gainer';

@Component({
  selector: 'app-angel-one',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe
  ],
  templateUrl: './angel-one.component.html',
  styleUrl: './angel-one.component.css'
})
export class AngelOneComponent implements OnInit, OnDestroy {

  readonly #angel = inject(AngelOneService);

  readonly #market = inject(MarketService);

  readonly #toast = inject(ToastService);

  // ======================================================
  // Dashboard State
  // ======================================================

  gainers = signal<Gainer[]>([]);

  marketStatus = signal('');

  marketTimer = signal('');

  availableCash = signal(0);

  strategy = signal('Pullback');

  autoTradingEnabled = signal(false);

  dailyTrades = signal(0);

  dailyLoss = signal(0);

  killSwitch = signal(false);

  searchText = signal('');

  // ======================================================
  // UI State
  // ======================================================

  showSummary = signal(false);

  showMarket = signal(false);

  showSettings = signal(false);

  // optional future panels

  showPortfolio = signal(false);

  showLogs = signal(false);

  private timerId: any;

  // ======================================================
  // Filtered Stocks
  // ======================================================

  filteredGainers = computed(() => {

    const search = this.searchText()
      .trim()
      .toLowerCase();

    if (!search) {
      return this.gainers();
    }

    return this.gainers().filter(x =>
      x.symbol
        .toLowerCase()
        .includes(search)
    );

  });

    // ======================================================
  // Lifecycle
  // ======================================================

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

      clearInterval(this.timerId);

    }

  }

  // ======================================================
  // Toolbar Actions
  // ======================================================

  toggleSummary(): void {

    this.showSummary.update(v => !v);

  }

  toggleMarket(): void {

    this.showMarket.update(v => !v);

  }

  toggleSettings(): void {

    this.showSettings.update(v => !v);

  }

  // ======================================================
  // Login
  // ======================================================

  private loginToAngel(): void {

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

  // ======================================================
  // Dashboard
  // ======================================================

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

          this.strategy.set(summary.strategy);

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

        error: err => {

          console.error(
            'Unable to load dashboard summary',
            err
          );

        }

      });

  }

  loadWalletBalance(): void {

    this.#angel
      .getAvailableCash()
      .subscribe({

        next: amount => {

          this.availableCash.set(amount);

        },

        error: () => {

          this.#toast.error(
            'Unable to fetch wallet balance'
          );

        }

      });

  }

  // ======================================================
  // Live Market Data
  // ======================================================

  subscribeToGainers(): void {

    this.#market.startConnection(

      data => {

        this.gainers.set(data);

      }

    );

  }

  refresh(): void {

    this.loadWalletBalance();

    this.loadDashboardSummary();

  }

    // ======================================================
  // Market Timer
  // ======================================================

  private startMarketTimer(): void {

    this.updateMarketTimer();

    this.timerId = setInterval(() => {

      this.updateMarketTimer();

    }, 1000);

  }

  private updateMarketTimer(): void {

    const now = new Date();

    const day = now.getDay();

    const open = new Date(now);
    open.setHours(9, 15, 0, 0);

    const close = new Date(now);
    close.setHours(15, 30, 0, 0);

    // Saturday / Sunday

    if (day === 0 || day === 6) {

      this.marketStatus.set('CLOSED');

      this.marketTimer.set(
        `Opens in ${this.formatTime(
          this.getNextMarketOpen(now).getTime() - now.getTime()
        )}`
      );

      return;

    }

    // Before market

    if (now < open) {

      this.marketStatus.set('CLOSED');

      this.marketTimer.set(
        `Opens in ${this.formatTime(
          open.getTime() - now.getTime()
        )}`
      );

      return;

    }

    // Market Open

    if (now >= open && now < close) {

      this.marketStatus.set('OPEN');

      this.marketTimer.set(
        `Closes in ${this.formatTime(
          close.getTime() - now.getTime()
        )}`
      );

      return;

    }

    // After Market

    this.marketStatus.set('CLOSED');

    this.marketTimer.set(
      `Opens in ${this.formatTime(
        this.getNextMarketOpen(now).getTime() - now.getTime()
      )}`
    );

  }

  // ======================================================
  // Next Trading Day
  // ======================================================

  private getNextMarketOpen(current: Date): Date {

    const next = new Date(current);

    next.setHours(9, 15, 0, 0);

    next.setDate(next.getDate() + 1);

    while (
      next.getDay() === 0 ||
      next.getDay() === 6
    ) {

      next.setDate(next.getDate() + 1);

    }

    return next;

  }

  // ======================================================
  // Format Countdown
  // ======================================================

  private formatTime(ms: number): string {

    const total = Math.max(
      0,
      Math.floor(ms / 1000)
    );

    const days = Math.floor(total / 86400);

    const hours = Math.floor(
      (total % 86400) / 3600
    );

    const minutes = Math.floor(
      (total % 3600) / 60
    );

    const seconds = total % 60;

    if (days > 0) {

      return `${days}d ${hours}h ${minutes}m`;

    }

    return `${hours}h ${minutes}m ${seconds}s`;

  }

}