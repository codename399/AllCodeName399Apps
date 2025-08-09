import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../services/role-service';
import { UserService } from '../services/user-service';
import { Role } from '../models/role';
import { LoaderService } from '../../app/services/loader.service';
import { PasswordMatchValidator } from '../../app/validators/password-match-validator';
import {
  isInvalid,
  getErrorMessage,
} from '../../app/validators/field-validator';
import { ToastService } from '../../app/services/toast.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  #userService = inject(UserService);
  #formBuilder = inject(FormBuilder);
  #router = inject(Router);
  #loaderService = inject(LoaderService);
  #toastService = inject(ToastService);
  #route = inject(ActivatedRoute);
  form: FormGroup;

  id!: string;

  get getErrorMessage() {
    return getErrorMessage;
  }

  get isInvalid() {
    return isInvalid;
  }

  constructor() {
    this.form = this.#formBuilder.group(
      {
        name: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required]], // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        confirmPassword: ['', [Validators.required]],
        emailId: ['', [Validators.required, Validators.email]],
        contactNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
      },
      {
        validators: PasswordMatchValidator,
      }
    );

    if(!this.id){
      this.form.controls['password'].clearValidators();
      this.form.controls['confirmPassword'].clearValidators();
    }

    this.#route.params.subscribe((param) => {
      this.id = param['id'];
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.#userService.getById(this.id).subscribe((users: User[]) => {
        if (!!users) {
          this.form.patchValue(users[0]);
        }
      });
    }
  }

  onRegister() {
    if (this.form.valid) {
      this.#loaderService.show();
      this.#userService.add(this.form.value).subscribe({
        next: (response) => {
          this.#loaderService.hide();
          this.#toastService.showToast('Registration successful!');
          this.#router.navigate(['/login']);
        },
        error: (error) => {
          this.#loaderService.hide();
          this.#toastService.showToast('Registration failed!');
        },
      });
    } else {
      this.#toastService.showToast('Form is invalid');
    }
  }
}
