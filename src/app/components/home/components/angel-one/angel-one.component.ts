import { Component, inject, OnInit, signal } from '@angular/core';
import { AngelOneService } from '../../services/angel-one.service';
import { ToastService } from '../../../../services/toast.service';
import { Gainer } from '../../models/gainer';
import { DecimalPipe } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-angel-one',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './angel-one.component.html',
  styleUrl: './angel-one.component.css'
})
export class AngelOneComponent implements OnInit {
  #angelOneService = inject(AngelOneService);
  #toastService = inject(ToastService);

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

  gainers() {
    this.#angelOneService.gainers().subscribe((response) => {
      this.gainer.set(response);
    }, (error) => {
      console.error('Error fetching gainers:', error);
    });
  }

  subscribeToGainers() {
    interval(1000).subscribe(() => {
      this.gainer();
    })
  }
}
