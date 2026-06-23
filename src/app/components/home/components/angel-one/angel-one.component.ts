import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';

import { CommonModule, DecimalPipe } from '@angular/common';

import { AngelOneService } from '../../services/angel-one.service';
import { ToastService } from '../../../../services/toast.service';
import { Gainer } from '../../models/gainer';
import { MarketService } from '../../services/market.service';

@Component({
  selector: 'app-angel-one',
  standalone: true,
  imports: [DecimalPipe, CommonModule],
  templateUrl: './angel-one.component.html',
  styleUrl: './angel-one.component.css'
})
export class AngelOneComponent implements OnInit, OnDestroy {

  #angelOneService = inject(AngelOneService);

  #toastService = inject(ToastService);

  #marketService = inject(MarketService);

  gainer = signal<Gainer[]>([]);

  marketStatus = signal('');

  marketTimer = signal('');

  availableCash = signal<number>(0);

  private timerId: any;

  ngOnInit(): void {

    this.updateMarketTimer();

    this.timerId = setInterval(() => {
      this.updateMarketTimer();
    }, 1000);

    if (!this.#angelOneService.isLoggedIn()) {

      this.loginToAngel();

    } else {

      this.loadWalletBalance();

      this.subscribeToGainers();
    }
  }

  ngOnDestroy(): void {

    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  loginToAngel() {

    this.#angelOneService.loginToAngel().subscribe({

      next: () => {

        this.#toastService.success(
          'Login to Angel One successful'
        );

        this.loadWalletBalance();

        this.subscribeToGainers();
      },

      error: () => {

        this.#toastService.error(
          'Login to Angel One failed'
        );
      }
    });
  }
  subscribeToGainers(): void {

    this.#marketService.startConnection(

      data => {

        this.gainer.set(data);

      }
    );
  }

  private updateMarketTimer(): void {

    const now = new Date();

    const day = now.getDay();

    const openTime = new Date();

    openTime.setHours(9, 15, 0, 0);

    const closeTime = new Date();

    closeTime.setHours(15, 30, 0, 0);

    // Weekend

    if (day === 0 || day === 6) {

      this.marketStatus.set('CLOSED');

      const nextMonday = new Date(now);

      const daysToMonday = day === 0 ? 1 : 2;

      nextMonday.setDate(
        now.getDate() + daysToMonday
      );

      nextMonday.setHours(
        9,
        15,
        0,
        0
      );

      this.marketTimer.set(
        `Opens in ${this.formatTime(
          nextMonday.getTime() - now.getTime()
        )}`
      );

      return;
    }

    // Before market opens

    if (now < openTime) {

      this.marketStatus.set('CLOSED');

      this.marketTimer.set(
        `Opens in ${this.formatTime(
          openTime.getTime() - now.getTime()
        )}`
      );

      return;
    }

    // Market open

    if (now >= openTime &&
      now < closeTime) {

      this.marketStatus.set('OPEN');

      this.marketTimer.set(
        `Closes in ${this.formatTime(
          closeTime.getTime() - now.getTime()
        )}`
      );

      return;
    }

    // After market closes

    this.marketStatus.set('CLOSED');

    const nextOpen = new Date(now);

    nextOpen.setDate(
      now.getDate() + 1
    );

    nextOpen.setHours(
      9,
      15,
      0,
      0
    );

    // Friday -> Monday

    if (day === 5) {

      nextOpen.setDate(
        now.getDate() + 3
      );
    }

    this.marketTimer.set(
      `Opens in ${this.formatTime(
        nextOpen.getTime() - now.getTime()
      )}`
    );
  }

  private formatTime(ms: number): string {

    const totalSeconds = Math.floor(
      ms / 1000
    );

    const hours = Math.floor(
      totalSeconds / 3600
    );

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds =
      totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  loadWalletBalance(): void {

    this.#angelOneService
      .getAvailableCash()
      .subscribe({

        next: (response) => {
          this.availableCash.set(
            response
          );
        },
        error: () => {

          this.#toastService.error(
            'Unable to fetch wallet balance'
          );
        }
      });
  }
}