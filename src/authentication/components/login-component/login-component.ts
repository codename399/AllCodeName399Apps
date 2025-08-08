import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
  standalone: false,
})
export class LoginComponent {
  #authenticationService = inject(AuthenticationService);
  #formBuilder = inject(FormBuilder);
  loginForm: FormGroup;

  constructor() {
    // Initialization code can go here
    this.loginForm = this.#formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Example method to handle user login
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    // Assuming loginRequest is an object with username and password
    const {username, password} = this.loginForm.value;
    
    this.validateUser({username, password});
  }

  // Method to validate user credentials
  validateUser(loginRequest: any) {
    this.#authenticationService.validateUser(loginRequest).subscribe({
      next: (response) => {
        console.log('Login successful', response);
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }
}
