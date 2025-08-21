import { Component, effect, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../../../../../constants';
import { SharedModule } from '../../../../../shared-module';
import {
  getErrorMessage,
  isInvalid,
} from '../../../../../validators/field-validator';
import { FileUploadService } from '../../../../services/file-upload.service';
import { ToastService } from '../../../../services/toast.service';
import { Project } from '../../../authentication/models/project';
import { User } from '../../../authentication/models/user';
import { GridService } from '../../../authentication/services/grid.service';
import { ProjectService } from '../../../authentication/services/project-service';
import { GridComponent } from '../../../grid/grid.component';
import { Config } from '../../../../../assets/environments/config';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [SharedModule, GridComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
  providers: [FileUploadService]
})
export class ProjectComponent {
  #route = inject(ActivatedRoute);
  #formBuilder = inject(FormBuilder);
  #toastService = inject(ToastService);
  #gridService = inject(GridService<User>);
  #fileUploadService = inject(FileUploadService);
  #config = inject(Config);

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

  get url() {
    return this.#fileUploadService.url;
  }

  set url(value: string) {
    this.#fileUploadService.url = value;
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
      description: [''],
      imageUrl: [this.url],
      route: [''],
      navigationText: [''],
      isAdmin: [false]
    });

    effect(() => {
      if (this.showForm) {
        if (this.item) {
          this.url =
            this.item?.imageUrl ?? this.#config.profilePictureUrl;
        }

        this.form.patchValue(this.item ?? {});
      }
    });
  }

  onSubmit() {
    this.form.patchValue({ imageUrl: this.url });
    let project: Project = this.form.value;

    if (this.form.valid) {
      if (this.item) {
        project.id = this.item.id;
        this.item = project;

        this.#gridService.update();
      } else {
        this.item = project;
        this.#gridService.add();
      }
    } else {
      this.#toastService.error('Invalid form.');
    }
  }

  onFileSelected(event: any) {
    this.#fileUploadService.onFileSelected(event);
  }
}
