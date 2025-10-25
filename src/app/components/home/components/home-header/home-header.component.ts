import { Component, HostListener, inject } from '@angular/core';
import { AuthenticationService } from '../../../authentication/services/authentication-service';
import { Router } from '@angular/router';
import { Config } from '../../../../../assets/environments/config';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css'
})
export class HomeHeaderComponent {
  #authenticationService = inject(AuthenticationService);
  #userService = inject(UserService);
  #router = inject(Router);
  #config = inject(Config);

  user!: User;
  profilePictureUrl!: string;
  logoUrl!: string
  isDropdownOpen: boolean = false;

  constructor() {
    this.profilePictureUrl = this.#config.profilePictureUrl;
  }

  ngOnInit(): void {
    this.#userService
      .getById(this.#authenticationService.userId ?? '')
      .subscribe((users: User[]) => {
        if (!!users?.length) {
          this.user = users[0];
          this.#authenticationService.user = this.user;

          if (this.user.profilePicture) {
            this.profilePictureUrl = this.user.profilePicture;
          }
        }
      });
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
