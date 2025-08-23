import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared-module';
import { Router } from '@angular/router';
import { Constants } from '../../../../../constants';
import { User } from '../../models/user';
import { AuthenticationService } from '../../../authentication/services/authentication-service';
import { UserService } from '../../services/user-service';
import { Config } from '../../../../../assets/environments/config';

@Component({
  selector: 'app-home',
  imports: [SharedModule],
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
