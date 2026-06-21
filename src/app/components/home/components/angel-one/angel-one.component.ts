import { Component, inject, OnInit, signal } from '@angular/core';
import { AngelOneService } from '../../services/angel-one.service';
import { ToastService } from '../../../../services/toast.service';
import { Gainer } from '../../models/gainer';
import { CommonModule, DecimalPipe } from '@angular/common';
import { interval } from 'rxjs';
import { MarketService } from '../../services/market.service';

@Component({
  selector: 'app-angel-one',
  standalone: true,
  imports: [DecimalPipe, CommonModule],
  templateUrl: './angel-one.component.html',
  styleUrl: './angel-one.component.css'
})
export class AngelOneComponent implements OnInit {
  #angelOneService = inject(AngelOneService);
  #toastService = inject(ToastService);
  #marketService = inject(MarketService);

  gainer = signal<Gainer[]>([]);

  ngOnInit(): void {
    if (!this.#angelOneService.isLoggedIn()) {
      this.loginToAngel();
    }
    else {
      this.subscribeToGainers();
    }
  }

  loginToAngel() {
    this.#angelOneService.loginToAngel().subscribe(() => {
      this.#toastService.success('Login to Angel One successful');

      this.subscribeToGainers();
    }, () => {
      this.#toastService.error('Login to Angel One failed');
    });
  }

  subscribeToGainers() {
    this.#marketService.startConnection(
      data => {
        this.gainer.set(data);
      });
  }
}
