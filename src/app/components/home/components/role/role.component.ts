import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../../../shared-module';
import { Role } from '../../../authentication/models/role';
import { RoleService } from '../../../authentication/services/role-service';
import { GridComponent } from '../../../grid/grid.component';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
})
export class RoleComponent extends GridComponent<Role> {
  #formBuilder = inject(FormBuilder);
  #route = inject(ActivatedRoute);

  form: FormGroup;

  constructor() {
    super();
    this.gridService.service = RoleService;
    this.gridService.pagedResponse = this.#route.snapshot.data['pagedResponse'];
    this.gridService.displayedColumns = ['select', 'Name'];

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
    let role: Role = this.form.value;

    if (this.form.valid) {
      this.loaderService.show();

      if (this.item) {
        role.id = this.item.id;
        this.item = role;

        this.onEdit();
      } else {
        this.item = role;
        this.onAdd();
      }
    } else {
      this.toastService.error('Invalid form.');
    }
  }
}
