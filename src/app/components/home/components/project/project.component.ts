import { Component, effect, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../../../shared-module';
import {
  getErrorMessage,
  isInvalid,
} from '../../../../../validators/field-validator';
import { LoaderService } from '../../../../services/loader.service';
import { ToastService } from '../../../../services/toast.service';
import { Project } from '../../../authentication/models/project';
import { User } from '../../../authentication/models/user';
import { GridService } from '../../../authentication/services/grid.service';
import { ProjectService } from '../../../authentication/services/project-service';
import { GridComponent } from '../../../grid/grid.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [SharedModule, GridComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  #route = inject(ActivatedRoute);
  #formBuilder = inject(FormBuilder);
  #toastService = inject(ToastService);
  #loaderService = inject(LoaderService);
  #gridService = inject(GridService<User>);

  form: FormGroup;

  @ViewChild(GridComponent) gridComponent!: GridComponent<Project>;

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

  set item(value: Project | null) {
    this.#gridService.item = value;
  }

  set showForm(value: boolean) {
    this.#gridService.showForm = value;
  }

  constructor() {
    this.#gridService.service = ProjectService;
    this.#gridService.pagedResponse =
      this.#route.snapshot.data['pagedResponse'];
    this.#gridService.displayedColumns = ['select', 'Name', 'Description'];

    this.form = this.#formBuilder.group({
      name: ['', [Validators.required]],
    });

    effect(() => {
      if (this.showForm) {
        this.form.patchValue(this.item ?? {});
      }
    });
  }

  onSubmit() {
    let user: Project = this.form.value;

    if (this.form.valid) {
      this.#loaderService.show();

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
}
