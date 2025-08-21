import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../../../shared-module';
import { Project } from '../../../authentication/models/project';
import { User } from '../../../authentication/models/user';
import { PAGINATION_REQUEST } from '../../../../../injectors/common-injector';
import { UserProjectMappingService } from '../../../authentication/services/user-project-mapping-service';
import { Constants } from '../../../../../constants';
import { OperatorType } from '../../../../models/enums/operator-type.enum';
import { UserProjectMapping } from '../../../authentication/models/user-project-mapping';
import { PagedResponse } from '../../../../models/paged-response';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-user-project-mapping',
  imports: [SharedModule],
  templateUrl: './user-project-mapping.component.html',
  styleUrl: './user-project-mapping.component.css'
})
export class UserProjectMappingComponent {
  #route = inject(ActivatedRoute);
  #paginationRequest = inject(PAGINATION_REQUEST);
  #userProjectMappingService = inject(UserProjectMappingService);
  #formBuilder = inject(FormBuilder);
  #toastService = inject(ToastService);

  users: User[] = [];
  projects: Project[] = [];
  userProjectMapping!: UserProjectMapping | null;
  form!: FormGroup;

  get userId() {
    return this.form.get("userId") as FormControl;
  }

  get projectIds() {
    return this.form.get("projectIds") as FormControl;
  }

  constructor() {
    this.users = this.#route.snapshot.data["usersandprojects"][0]?.items;
    this.projects = this.#route.snapshot.data["usersandprojects"][1]?.items;

    this.form = this.#formBuilder.group({
      userId: [null, [Validators.required]],
      projectIds: [[], [Validators.required]]
    });

    this.userId.valueChanges.subscribe((userId: string) => {
      if (userId) {
        this.projectIds.reset();
        this.getAll(userId);
      }
    })
  }

  getAll(userId: string) {
    this.#paginationRequest.filters = [
      {
        key: Constants.userId,
        value: userId,
        operator: OperatorType.Equal
      }
    ]

    this.#userProjectMappingService.getAll(this.#paginationRequest).subscribe((pagedResponse: PagedResponse<UserProjectMapping>) => {
      if (pagedResponse) {
        if (pagedResponse.count > 0) {
          this.userProjectMapping = pagedResponse.items[0];
          this.projectIds.setValue(this.userProjectMapping.projectIds);
        }
      }
    });
  }

  onSelectionChange(event: any, project: Project) {
    let selections: string[] = this.projectIds.value ?? [];

    if (event.checked) {
      if (!selections.includes(project.id ?? "")) {
        this.projectIds.setValue([...selections, project.id]);
      }
    }
    else {
      selections = selections.filter((f: any) => f != project.id);
      this.projectIds.setValue(selections);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      let userProjectMapping: UserProjectMapping = this.form.value;

      if (this.userProjectMapping != null) {
        userProjectMapping.id = this.userProjectMapping.id;
      }

      this.#userProjectMappingService.update(userProjectMapping).subscribe(() => {
        this.#toastService.success("Projects mapped successfully");
        this.form.reset();
      });
    }
    else {
      this.#toastService.error("Please select projects to map");
    }
  }

  setSelection(projectId: string) {
    let selections: string[] = this.projectIds.value ?? [];

    if (selections.includes(projectId)) {
      return true;
    }

    return false;
  }
}
