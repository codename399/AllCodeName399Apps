import { Component, HostListener, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from '../../../../../assets/environments/config';
import { AuthenticationService } from '../../../authentication/services/authentication-service';
import { User } from '../../models/user';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css'
})
export class HomeHeaderComponent {
  #authenticationService = inject(AuthenticationService);
  #router = inject(Router);
  #config = inject(Config);

  @Input("user") set user(value: User) {
    this._user = value;

    if (this._user) {
      this.#authenticationService.user = this.user;

      if (this.user.profilePicture) {
        this.profilePictureUrl = this.user.profilePicture ?? "";
      }
    }
  }

  private _user!: User;
  profilePictureUrl!: string;
  logoUrl!: string
  isDropdownOpen: boolean = false;

  constructor() {
    this.profilePictureUrl = this.#config.profilePictureUrl;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.#authenticationService.logout();
  }

  changePassword() {
    this.#router.navigate(['/home/change-password']);
  }

  editProfile() {
    this.#router.navigate(['/home/register', this.user.id]);
  }

  goHome() {
    this.#router.navigate(['/home']);
  }

  // Optional: Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isDropdownOpen = false;
    }
  }
}
