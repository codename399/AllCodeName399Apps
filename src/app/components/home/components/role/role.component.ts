import { Component, inject, input, model, ViewChild } from '@angular/core';
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
import { GridComponent } from '../../../grid/grid.component';

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

  role!: Role | null;
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

      if (this.role) {
        role.id = this.role.id;
        this.update(role);
      } else {
        this.add(role);
      }
    } else {
      this.#toastService.error('Invalid form.');
    }
  }

  add(role: Role) {
    this.#roleService.add(role).subscribe({
      next: () => {
        this.getAll();
        this.#toastService.success('Added successfully');
      },
    });
  }

  update(role: Role) {
    this.#roleService.update(role).subscribe({
      next: () => {
        this.role = null;
        this.getAll();
        this.#toastService.success('Updated successfully');
      },
    });
  }

  delete(event: Role[]) {
    this.#loaderService.show();

    this.#roleService.delete(event.map((m) => m.id ?? '')).subscribe({
      next: () => {
        this.getAll();
        this.#toastService.success('Deleted successfully');
      },
    });
  }

  edit(event: Role) {
    this.role = event;
    this.showForm = true;
    this.form.patchValue(this.role);
  }

  getAll() {
    this.#roleService.getAll().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
        this.#loaderService.hide();
        window.location.reload();
      },
    });
  }
}
