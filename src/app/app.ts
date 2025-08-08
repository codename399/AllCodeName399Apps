import { Component, signal } from '@angular/core';
import { SharedModule } from '../shared-module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule, SharedModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('AllCodeName399Apps');
}
