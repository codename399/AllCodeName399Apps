import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { getErrorMessage, isInvalid } from "../../../../../validators/field-validator";
import { ToastService } from "../../../../services/toast.service";
import { AuthenticationService } from "../../services/authentication-service";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  #authenticationService = inject(AuthenticationService);
  #formBuilder = inject(FormBuilder);
  #router = inject(Router);
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

    this.#authenticationService.validateUser(loginRequest).subscribe({
      next: (response) => {
        this.#router.navigate(['/home']);
        this.#toastService.success('Login successful!');
      }
    });
  }

  gotoRegister() {
    this.#router.navigate(['/register']);
  }
}
