import { Component, effect, inject, ViewChild } from '@angular/core';
import { DebtManagerService } from '../../services/debt-manager-service';
import { Debt } from '../../models/debt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../../../shared-module';
import { getErrorMessage, isInvalid } from '../../../../../validators/field-validator';
import { ToastService } from '../../../../services/toast.service';
import { GridService } from '../../../authentication/services/grid.service';
import { GridComponent } from '../../../grid/grid.component';
import { Role } from '../../models/role';

@Component({
  selector: 'app-debt-manager',
  standalone: true,
  imports: [SharedModule, GridComponent],
  templateUrl: './debt-manager.component.html',
  styleUrl: './debt-manager.component.css',
  providers: [DebtManagerService]
})
export class DebtManagerComponent {
  #formBuilder = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  #toastService = inject(ToastService);
  #gridService = inject(GridService<Role>);

  form: FormGroup;

  @ViewChild(GridComponent) gridComponent!: GridComponent<Debt>;

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

  set item(value: Debt | null) {
    this.#gridService.item = value;
  }

  set showForm(value: boolean) {
    this.#gridService.showForm = value;
  }

  constructor() {
    this.#gridService.service = DebtManagerService;
    this.#gridService.pagedResponse =
      this.#route.snapshot.data['pagedResponse'];
    this.#gridService.displayedColumns = ['select', 'Title'];

    this.form = this.#formBuilder.group({
      title: ['', [Validators.required]],
    });

    effect(() => {
      if (this.showForm) {
        this.form.patchValue(this.item ?? {});
      }
    });
  }

  onSubmit() {
    let debt: Debt = this.form.value;

    if (this.form.valid) {
      if (this.item) {
        debt.id = this.item.id;
        this.item = debt;

        this.#gridService.update();
      } else {
        this.item = debt;
        this.#gridService.add();
      }
    } else {
      this.#toastService.error('Invalid form.');
    }
  }
}
