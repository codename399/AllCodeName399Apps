import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Config } from '../../../../../assets/environments/config';
import { AuthenticationService } from '../../../authentication/services/authentication-service';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  #authenticationService = inject(AuthenticationService);
  #userService = inject(UserService);
  #router = inject(Router);
  #config = inject(Config);

  user!: User;
  profilePictureUrl!: string;
  logoUrl!: string

  constructor() {
    this.profilePictureUrl = this.#config.profilePictureUrl;
    this.logoUrl = this.#config.logoUrl;
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

  logout() {
    this.#authenticationService.logout();
  }

  changePassword() {
    this.#router.navigate(['/home/change-password']);
  }

  editProfile() {
    this.#router.navigate(['/home/register', this.user.id]);
  }
}
