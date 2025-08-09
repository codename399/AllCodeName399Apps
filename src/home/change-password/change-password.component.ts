import { Component, inject } from '@angular/core';
import {
  getErrorMessage,
  isInvalid,
} from '../../app/validators/field-validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../../app/services/loader.service';
import { ToastService } from '../../app/services/toast.service';
import { AuthenticationService } from '../../authentication/services/authentication-service';
import { SharedModule } from '../../shared-module';
import { UserService } from '../../authentication/services/user-service';
import { ChangePasswordRequest } from '../../authentication/models/change-password-request';
import { PasswordMatchValidator } from '../../app/validators/password-match-validator';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  #authenticationService = inject(AuthenticationService);
  #userService = inject(UserService);
  #formBuilder = inject(FormBuilder);
  #router = inject(Router);
  #loaderService = inject(LoaderService);
  #toastService = inject(ToastService);
  form: FormGroup;

  constructor() {
    this.form = this.#formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: PasswordMatchValidator,
      }
    );
  }

  get getErrorMessage() {
    return getErrorMessage;
  }

  get isInvalid() {
    return isInvalid;
  }

  onSubmit() {
    let changePasswordRequest: ChangePasswordRequest = {
      id: this.#authenticationService.loginResponse?.user.id ?? "",
      name: this.#authenticationService.loginResponse?.user.name ?? "",
      username: this.#authenticationService.loginResponse?.user.username ?? "",
      emailId: this.#authenticationService.loginResponse?.user.emailId ?? "",
      contactNumber: this.#authenticationService.loginResponse?.user.contactNumber ?? "",
      roleId: this.#authenticationService.loginResponse?.user.roleId ?? "",
      creationDate: this.#authenticationService.loginResponse?.user.creationDate ?? "",
      updationDate: this.#authenticationService.loginResponse?.user.updationDate ?? "",
      password: this.form.value.oldPassword ?? "",
      newPassword: this.form.value.password,
    };

    this.#loaderService.show();

    this.#userService.changePassword(changePasswordRequest).subscribe({
      next: (response) => {
        this.#loaderService.hide();
        this.#toastService.showToast('Password changed successfully!');
        this.#router.navigate(['/login']);
      },
      error: (error) => {
        this.#loaderService.hide();
        this.#toastService.showToast(
          'Failed to change password: ' + error.message
        );
      },
    });
  }
}
