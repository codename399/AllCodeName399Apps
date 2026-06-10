import { Component, computed, inject, OnInit } from '@angular/core';
import { Config } from '../../../../../assets/environments/config';

@Component({
  selector: 'app-kite',
  standalone: true,
  imports: [],
  templateUrl: './kite.component.html',
  styleUrl: './kite.component.css'
})
export class KiteComponent implements OnInit {
  #config = inject(Config);
  #kiteApiKey = computed(() => this.#config.kiteApiKey);

  ngOnInit(): void {
    this.loginToKite();
  }

  loginToKite() {
    window.location.href =
      `https://kite.zerodha.com/connect/login?v=3&api_key=${this.#kiteApiKey()}`;
  }
}
