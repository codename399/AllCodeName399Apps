import { Component, inject, input, model } from '@angular/core';
import { SharedModule } from '../../../../../shared-module';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../../authentication/models/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../../services/toast.service';
import {
  getErrorMessage,
  isInvalid,
} from '../../../../../validators/field-validator';
import { RoleService } from '../../../authentication/services/role-service';
import { LoaderService } from '../../../../services/loader.service';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
})
export class RoleComponent {
  #route = inject(ActivatedRoute);
  #formBuilder = inject(FormBuilder);
  #toastService = inject(ToastService);
  #loaderService = inject(LoaderService);
  #roleService = inject(RoleService);

  role!: Role;
  form: FormGroup;
  roles: Role[] = [];
  columns: string[] = ['Name'];
  showForm: boolean = false;

  get getErrorMessage() {
    return getErrorMessage;
  }

  get isInvalid() {
    return isInvalid;
  }

  constructor() {
    this.roles = this.#route.snapshot.data['roles'];

    this.form = this.#formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    let role: Role = this.form.value;

    if (this.form.valid) {
      this.#loaderService.show();
      this.#roleService.add(role).subscribe({
        next: () => {
          this.#roleService.getAll().subscribe({
            next: (roles: Role[]) => {
              this.roles = roles;
              this.#loaderService.hide();
            },
          });

          if (this.role) {
            this.#toastService.success('Updated successfully');
          } else {
            this.#toastService.success('Added successfully');
          }
        },
      });
    } else {
      this.#toastService.error('Invalid form.');
    }
  }
}
