import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../services/role-service';
import { UserService } from '../services/user-service';
import { Role } from '../models/role';

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
  registrationForm: FormGroup;

  roles:Role[] = [];

  ngOnInit() {
    this.#roleService.getAll().subscribe((roles: Role[]) => {
      this.roles = roles;
    });
  }

  constructor() {
    this.registrationForm = this.#formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      emailid: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      roleId: ['', Validators.required],
    });
  }

  onRegister() {
    if (this.registrationForm.valid) {
      this.#userService.add(this.registrationForm.value).subscribe({
        next: (response) => {
          console.log('User registered successfully', response);
          this.#router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
        },
      });
    } else {
      // Handle form validation errors
      console.error('Form is invalid');
    }
  }
}
