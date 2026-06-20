import { Component, inject, OnInit } from '@angular/core';
import { AngelOneService } from '../../services/angel-one.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-angel-one',
  standalone: true,
  imports: [],
  templateUrl: './angel-one.component.html'
})
export class AngelOneComponent implements OnInit {
  #angelOneService = inject(AngelOneService);
  #toastService = inject(ToastService);

  ngOnInit(): void {
    if (!this.#angelOneService.isLoggedIn()) {
      this.loginToAngel();
    }
    else {
      this.gainers();
    }

  }

  loginToAngel() {
    this.#angelOneService.loginToAngel().subscribe(() => {
      this.#toastService.success('Login to Angel One successful');

      this.gainers();
    }, () => {
      this.#toastService.error('Login to Angel One failed');
    });
  }

  gainers() {
    this.#angelOneService.gainers().subscribe((response) => {
      console.log('Gainers:', response);
    }, (error) => {
      console.error('Error fetching gainers:', error);
    });
  }
}
