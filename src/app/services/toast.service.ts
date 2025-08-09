import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  #message = signal<string>('');
  #toastEl: any;

  show(message: string) {
    this.#message.set(message);
  }

  clear() {
    this.#message.set('');
  }

  setToastElement(toastEl: any) {
    this.#toastEl = toastEl;
  }

  get message() {
    return this.#message();
  }

  showToast(message: string) {
    if (this.#toastEl) {
      this.show(message);
      this.#toastEl.show();
    }
  }
}
