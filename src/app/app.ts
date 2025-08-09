import { Component, effect, inject, signal } from '@angular/core';
import { SharedModule } from '../shared-module';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  imports: [LoaderComponent, RouterModule, SharedModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('AllCodeName399Apps');

  #loaderService = inject(LoaderService);
  #isLoading = signal<boolean>(false);

  get isLoading() {
    return this.#isLoading();
  }

  constructor() {
    effect(() => {
      this.#isLoading.set(this.#loaderService.isLoading());
    });
  }
}
