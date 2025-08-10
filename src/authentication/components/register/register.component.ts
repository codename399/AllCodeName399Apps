import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../app/services/loader.service';
import { ToastService } from '../../../app/services/toast.service';
import { Constants } from '../../../constants';
import { SharedModule } from '../../../shared-module';
import {
  getErrorMessage,
  isInvalid,
} from '../../../validators/field-validator';
import { PasswordMatchValidator } from '../../../validators/password-match-validator';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';

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
  #changeDetectorRef = inject(ChangeDetectorRef);
  form: FormGroup;
  user!: User;
  users: User[] = [];
  profilePictureUrl: string = Constants.defaultProfileUrl;
  id!: string | null;
  roleId!: string | null;

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
        profilePicture: [Constants.defaultProfileUrl],
      },
      {
        validators: PasswordMatchValidator,
      }
    );
  }

  ngOnInit() {
    this.users = this.#route.snapshot.data['users'];

    if (!!this.users?.length) {
      this.user = this.users[0];
      this.form.patchValue(this.user);
      this.id = this.user.id;
      this.roleId = this.user.roleId;

      if (this.user.profilePicture) {
        this.profilePictureUrl = this.user.profilePicture;
      }

      if (this.user) {
        this.form.controls['username'].clearValidators();
        this.form.controls['password'].clearValidators();
        this.form.controls['confirmPassword'].clearValidators();
      }
    }

    this.#changeDetectorRef.detectChanges();
  }

  onSubmit() {
    if (!this.user) {
      this.add();
    } else {
      this.update();
    }
  }

  add() {
    if (this.form.valid) {
      this.#loaderService.show();
      this.#userService.add(this.form.value).subscribe({
        next: (response) => {
          this.#loaderService.hide();
          this.#toastService.success('Registration successful!');
          this.#router.navigate(['/login']);
        },
        error: (error) => {
          this.#loaderService.hide();
          this.#toastService.error('Registration failed!');
        },
      });
    } else {
      this.#toastService.error('Form is invalid');
    }
  }

  update() {
    if (this.form.valid) {
      this.#loaderService.show();
      this.user = this.form.value;
      this.user.id = this.id;
      this.user.roleId = this.roleId;
      this.#userService.update(this.user).subscribe({
        next: (response) => {
          this.#loaderService.hide();
          this.#toastService.success('Updation successful!');
          this.#router.navigate(['/home']);
        },
        error: (error) => {
          this.#loaderService.hide();
          this.#toastService.error('Updation failed!');
        },
      });
    } else {
      this.#toastService.error('Form is invalid');
    }
  }

  onFileSelected(event: any) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePictureUrl = reader.result as string;
        this.form.patchValue({ profilePicture: this.profilePictureUrl }); // set Base64 string
      };
      reader.readAsDataURL(file);
    }
  }
}
