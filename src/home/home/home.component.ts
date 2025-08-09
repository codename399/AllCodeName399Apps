import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../authentication/models/user';
import { AuthenticationService } from '../../authentication/services/authentication-service';
import { SharedModule } from '../../shared-module';

@Component({
  selector: 'app-home',
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  #authenticationService = inject(AuthenticationService);
  #router = inject(Router);
  user!: User;

  constructor() {
    this.user = this.#authenticationService.loginResponse?.user!;
  }

  logout() {
    this.#authenticationService.clearToken();
    this.#router.navigate(['/login']);
  }

  changePassword() {
    this.#router.navigate(['/home/change-password']);
  }

  editProfile() {
    this.#router.navigate(['/home/register', this.user.id]);
  }
}
