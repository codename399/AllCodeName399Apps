import { Injectable, signal } from '@angular/core';
import { ToastType } from '../models/toast-type-enum';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  #message = signal<string>('');
  #toastEl: any;
  #delay = signal<number>(300000);
  #toastType = signal<ToastType>(ToastType.Primary); // Default delay of 3 seconds

  get message() {
    return this.#message();
  }

  get toastType() {
    return this.#toastType();
  }

  get delay() {
    return this.#delay();
  }

  set toastType(value: ToastType) {
    this.#toastType.set(value);
  }

  show(message: string) {
    this.#message.set(message);
  }

  clear() {
    this.#message.set('');
  }

  setToastElement(toastEl: any) {
    this.#toastEl = toastEl;
  }

  #showToast(message: string) {
    if (this.#toastEl) {
      this.show(message);
      this.#toastEl.show();
    }
  }

  primary(message: string) {
    this.toastType = ToastType.Primary;
    this.#showToast(message);
  }

  success(message: string) {
    this.toastType = ToastType.Success;
    this.#showToast(message);
  }

  error(message: string) {
    this.toastType = ToastType.Danger;
    this.#showToast(message);
  }

  warning(message: string) {
    this.toastType = ToastType.Warning;
    this.#showToast(message);
  }
}
