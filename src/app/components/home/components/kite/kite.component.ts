import { Component, computed, inject, OnInit } from '@angular/core';
import { Config } from '../../../../../assets/environments/config';
import { ActivatedRoute } from '@angular/router';
import { KiteService } from '../../services/kite.service';
import { AuthenticationService } from '../../../authentication/services/authentication-service';

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

  ngOnInit(): void {
    this.fetchRequestToken();
  }

  fetchRequestToken() {
    this.#route.queryParams.subscribe(params => {
      const requestToken = params['request_token'];

      if (requestToken) {
        if (!this.#kiteService.isLoggedIn()) {
          this.generateSession(requestToken);
        }
        else {
          this.loginToKite();
        }
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
    this.#kiteService.generateSession(generateSessionRequest).subscribe(() => { }
      , () => {
        this.#authenticationService.logout();
      }
    );
  }
}

