import { Component, effect, inject, signal } from '@angular/core';
import { SharedModule } from '../shared-module';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';


declare const bootstrap: any; //

@Component({
  selector: 'app-root',
  imports: [LoaderComponent, ToastComponent, RouterModule, SharedModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('AllCodeName399Apps');

  toastEl: any;

  #loaderService = inject(LoaderService);
  #isLoading = signal<boolean>(false);
  #toastService = inject(ToastService);

  get isLoading() {
    return this.#isLoading();
  }

  constructor() {
    effect(() => {
      this.#isLoading.set(this.#loaderService.isLoading());
      this.#toastService.setToastElement(this.toastEl);
    });
  }

  ngAfterViewInit(): void {
    const toastDom = document.getElementById('myToast');
    if (toastDom) {
      this.toastEl = new bootstrap.Toast(toastDom, { delay: this.#toastService.delay });
    }
  }
}
