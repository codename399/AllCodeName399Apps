import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../services/role-service';
import { UserService } from '../services/user-service';
import { Role } from '../models/role';
import { LoaderService } from '../../app/services/loader.service';
import { PasswordMatchValidator } from '../../app/validators/password-match-validator';
import {
  isInvalid,
  getErrorMessage,
} from '../../app/validators/field-validator';

@Component({
  selector: 'app-register',
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  #roleService = inject(RoleService);
  #userService = inject(UserService);
  #formBuilder = inject(FormBuilder);
  #router = inject(Router);
  #loaderService = inject(LoaderService);
  registrationForm: FormGroup;

  roles: Role[] = [];

  get getErrorMessage() {
    return getErrorMessage;
  }

  get isInvalid() {
    return isInvalid;
  }

  ngOnInit() {
    this.#roleService.getAll().subscribe((roles: Role[]) => {
      this.roles = roles;
    });
  }

  constructor() {
    this.registrationForm = this.#formBuilder.group(
      {
        name: ['', Validators.required],
        username: ['', Validators.required],
        password: [
          '',
          [
            Validators.required
          ],
        ], // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        confirmPassword: [
          '',
          [
            Validators.required
          ],
        ],
        emailid: ['', [Validators.required, Validators.email]],
        contactNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
        roleId: ['', Validators.required],
      },
      {
        validators: PasswordMatchValidator,
      }
    );
  }

  onRegister() {
    if (this.registrationForm.valid) {
      this.#loaderService.show();
      this.#userService.add(this.registrationForm.value).subscribe({
        next: (response) => {
          this.#loaderService.hide();
          this.#router.navigate(['/login']);
        },
        error: (error) => {
          this.#loaderService.hide();
          console.error('Registration failed', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
