import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '../../../../../shared-module';
import { getErrorMessage, isInvalid } from '../../../../../validators/field-validator';
import { PasswordMatchValidator } from '../../../../../validators/password-match-validator';
import { LoaderService } from '../../../../services/loader.service';
import { ToastService } from '../../../../services/toast.service';
import { ChangePasswordRequest } from '../../../authentication/models/change-password-request';
import { AuthenticationService } from '../../../authentication/services/authentication-service';
import { UserService } from '../../../authentication/services/user-service';

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
      id: this.#authenticationService?.user?.id ?? "",
      password: this.form.value.oldPassword ?? "",
      newPassword: this.form.value.password,
    };

    this.#loaderService.show();

    this.#userService.changePassword(changePasswordRequest).subscribe({
      next: (response) => {
        this.#loaderService.hide();
        this.#toastService.success('Password changed successfully!');
        this.#authenticationService.clearToken();
        this.#router.navigate(['/login']);
      },
      error: (error) => {
        this.#loaderService.hide();
        this.#toastService.error(
          'Failed to change password: ' + error.message
        );
      },
    });
  }
}
