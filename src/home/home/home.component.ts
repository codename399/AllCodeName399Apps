import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../authentication/models/user';
import { AuthenticationService } from '../../authentication/services/authentication-service';
import { SharedModule } from '../../shared-module';
import { UserService } from '../../authentication/services/user-service';
import { Constants } from '../../constants';

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
  user!: User;
  profilePictureUrl: string = Constants.defaultProfileUrl;

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
