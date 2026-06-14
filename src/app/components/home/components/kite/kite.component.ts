import { Component, computed, inject, OnInit } from '@angular/core';
import { Config } from '../../../../../assets/environments/config';
import { ActivatedRoute } from '@angular/router';
import { KiteService } from '../../services/kite.service';
import { AuthenticationService } from '../../../authentication/services/authentication-service';
import { interval } from 'rxjs';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-kite',
  standalone: true,
  imports: [],
  templateUrl: './kite.component.html',
  styleUrl: './kite.component.css'
})
export class KiteComponent implements OnInit {
  #config = inject(Config);
  #route = inject(ActivatedRoute);
  #kiteService = inject(KiteService);
  #kiteApiKey = computed(() => this.#config.kiteApiKey);
  #authenticationService = inject(AuthenticationService);
  #toastService = inject(ToastService);

  ngOnInit(): void {
    if (!this.#kiteService.isLoggedIn()) {
      this.fetchRequestToken();
    }
  }

  fetchRequestToken() {
    this.#route.queryParams.subscribe(params => {
      const requestToken = params['request_token'];

      if (requestToken) {
        this.generateSession(requestToken);
      }
      else {
        this.loginToKite();
      }
    });
  }

  loginToKite() {
    window.location.href =
      `https://kite.zerodha.com/connect/login?v=3&api_key=${this.#kiteApiKey()}`;
  }

  generateSession(requestToken: string) {
    const generateSessionRequest = { requestToken };
    this.#kiteService.generateSession(generateSessionRequest).subscribe(() => {
      this.#toastService.success('Session generated successfully');

      interval(500).subscribe(() => {
        this.gainers();
        this.losers();
      });
    }
      , () => {
        this.#toastService.error('Failed to generate session');
        this.#authenticationService.logout();
      }
    );
  }

  gainers() {
    this.#kiteService.gainers().subscribe((response) => {
      console.log('Gainers:', response);
    });
  }

  losers() {
    this.#kiteService.losers().subscribe((response) => {
      console.log('Losers:', response);
    });
  }
}

