import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared-module';
import { AuthenticationService } from '../../services/authentication-service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../app/services/loader.service';
import { ToastService } from '../../../app/services/toast.service';
import {
  getErrorMessage,
  isInvalid,
} from '../../../validators/field-validator';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
  imports: [SharedModule],
})
export class LoginComponent {
  #authenticationService = inject(AuthenticationService);
  #formBuilder = inject(FormBuilder);
  #router = inject(Router);
  #loaderService = inject(LoaderService);
  #toastService = inject(ToastService);
  form: FormGroup;

  get getErrorMessage() {
    return getErrorMessage;
  }

  get isInvalid() {
    return isInvalid;
  }

  constructor() {
    // Initialization code can go here
    this.form = this.#formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Example method to handle user login
  onLogin() {
    if (this.form.invalid) {
      return;
    }

    this.validateUser(this.form.value);
  }

  // Method to validate user credentials
  validateUser(loginRequest: any) {
    this.#loaderService.show();

    this.#authenticationService.validateUser(loginRequest).subscribe({
      next: (response) => {
        this.#loaderService.hide();
        this.#router.navigate(['/home']);
        this.#toastService.success('Login successful!');
      },
      error: (error) => {
        this.#loaderService.hide();
        this.#toastService.error('Login failed!');
      },
    });
  }

  gotoRegister() {
    this.#router.navigate(['/register']);
  }
}
