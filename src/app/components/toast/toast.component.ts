import { Component, effect, inject, signal } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  #toastService = inject(ToastService);
  #message = signal<string>("");

  get message() {
    return this.#message();
  }

  constructor() {
    effect(() => {
      this.#message.set(this.#toastService.message);
    });
  }
}
