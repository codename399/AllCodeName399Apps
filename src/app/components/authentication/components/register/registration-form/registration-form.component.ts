import { Component, inject, input, OnInit, output } from '@angular/core';
import {
  getErrorMessage,
  isInvalid,
} from '../../../../../../validators/field-validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../../../../../constants';
import { PasswordMatchValidator } from '../../../../../../validators/password-match-validator';
import { User } from '../../../models/user';
import { SharedModule } from '../../../../../../shared-module';
import { ToastService } from '../../../../../services/toast.service';

@Component({
  selector: 'app-registration-form',
  imports: [SharedModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
})
export class RegistrationFormComponent implements OnInit {
  #formBuilder = inject(FormBuilder);
  #toastService = inject(ToastService);

  user = input<User>();
  onFormSubmit = output<User>();

  form: FormGroup;
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
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
            ),
          ],
        ], // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
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

  ngOnInit(): void {
    if (this.user()) {
      this.form.patchValue(this.user() ?? {});
      this.id = this.user()?.id ?? null;
      this.roleId = this.user()?.roleId ?? null;

      if (this.user()?.profilePicture) {
        this.profilePictureUrl =
          this.user()?.profilePicture ?? Constants.defaultProfileUrl;
      }

      if (this.user()) {
        this.form.controls['username'].clearValidators();
        this.form.controls['password'].clearValidators();
        this.form.controls['confirmPassword'].clearValidators();
      }
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.onFormSubmit.emit({
        id: this.id,
        roleId: this.roleId,
        ...this.form.value,
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
