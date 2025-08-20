import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../../../shared-module';
import {
  getErrorMessage,
  isInvalid,
} from '../../../../../validators/field-validator';
import { ToastService } from '../../../../services/toast.service';
import { RegistrationFormComponent } from '../../../authentication/components/register/registration-form/registration-form.component';
import { User } from '../../../authentication/models/user';
import { GridService } from '../../../authentication/services/grid.service';
import { UserService } from '../../../authentication/services/user-service';
import { GridComponent } from '../../../grid/grid.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SharedModule, GridComponent, RegistrationFormComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  #route = inject(ActivatedRoute);
  #formBuilder = inject(FormBuilder);
  #toastService = inject(ToastService);
  #gridService = inject(GridService<User>);

  form: FormGroup;

  get getErrorMessage() {
    return getErrorMessage;
  }

  get isInvalid() {
    return isInvalid;
  }

  get item() {
    return this.#gridService.item;
  }

  get showForm() {
    return this.#gridService.showForm;
  }

  set item(value: User | null) {
    this.#gridService.item = value;
  }

  set showForm(value: boolean) {
    this.#gridService.showForm = value;
  }

  constructor() {
    this.#gridService.service = UserService;
    this.#gridService.pagedResponse =
      this.#route.snapshot.data['pagedResponse'];
    this.#gridService.displayedColumns = [
      'select',
      'Name',
      'Username',
      'EmailId',
      'ContactNumber',
    ];

    this.form = this.#formBuilder.group({
      name: ['', [Validators.required]],
    });

    effect(() => {
      if (this.showForm) {
        this.form.patchValue(this.item ?? {});
      }
    });
  }

  onSubmit(user: User) {
    if (user) {
      this.item = user;
    }

    if (this.form.valid) {
      if (this.item) {
        user.id = this.item.id;
        this.item = user;

        this.#gridService.update();
      } else {
        this.item = user;
        this.#gridService.add();
      }
    } else {
      this.#toastService.error('Invalid form.');
    }
  }

  goToList() {
    this.showForm = false;
  }
}
