import { Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../../../../../constants';
import { SharedModule } from '../../../../../shared-module';
import { getErrorMessage, isInvalid } from '../../../../../validators/field-validator';
import { OperatorType } from '../../../../models/enums/operator-type.enum';
import { PagedResponse } from '../../../../models/paged-response';
import { PaginationRequest } from '../../../../models/pagination-request';
import { ToastService } from '../../../../services/toast.service';
import { GridService } from '../../../authentication/services/grid.service';
import { GridComponent } from '../../../grid/grid.component';
import { Debt } from '../../models/debt';
import { DebtDto } from '../../models/dto/debt-dto';
import { TransactionType } from '../../models/enum/transaction-type-enum';
import { Project } from '../../models/project';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { DebtManagerService } from '../../services/debt-manager-service';
import { ProjectService } from '../../services/project-service';
import { UserService } from '../../services/user-service';
import { AuthenticationService } from '../../../authentication/services/authentication-service';

@Component({
  selector: 'app-debt-manager',
  standalone: true,
  imports: [SharedModule, GridComponent],
  templateUrl: './debt-manager.component.html',
  styleUrl: './debt-manager.component.css',
  providers: [DebtManagerService]
})
export class DebtManagerComponent implements OnInit {
  #formBuilder = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  #toastService = inject(ToastService);
  #gridService = inject(GridService<Role>);
  #userService = inject(UserService);
  #authService = inject(AuthenticationService);

  form: FormGroup;
  users: User[] = [];
  transactionTypes: string[] = Object.keys(TransactionType);

  get amountToSettle() {
    return this.form.get("amountToSettle") as FormControl
  }

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

  set item(value: DebtDto | null) {
    this.#gridService.item = value;
  }

  set showForm(value: boolean) {
    this.#gridService.showForm = value;
  }

  constructor() {
    this.#gridService.service = DebtManagerService;
    this.#gridService.pagedResponse =
      this.#route.snapshot.data['pagedResponse'];
    this.#gridService.displayedColumns = ['select', 'Title', 'Description', 'Transaction Type', 'Total Amount', 'Settled Amount', 'Is Settled', 'Settlement Date', 'Expected Settlement Date'];

    this.form = this.#formBuilder.group({
      title: ['', [Validators.required]],
      fromUserId: [this.#authService.userId, [Validators.required]],
      toUserId: ['', [Validators.required]],
      description: ['', [Validators.required]],
      transactionType: [TransactionType.Take, [Validators.required]],
      totalAmount: [{ value: 0, disabled: this.item }, [Validators.required]],
      transactionDate: [new Date(), [Validators.required]],
      amountToSettle: [0, [Validators.required]],
      settledAmount: [{ value: 0, disabled: true }, [Validators.required]],
      isSettled: [{ value: false, disabled: true }, [Validators.required]],
      settlementDate: [null],
      expectedSettlementDate: [null]
    });

    this.amountToSettle.valueChanges.subscribe((value) => {
      if (value && value > 0 && this.item) {
        this.item.settledAmount += value;

        if ((this.item.settledAmount ?? 0) >= (this.item.totalAmount ?? 0)) {
          this.item.settlementDate = new Date();
        }
      }
    })

    effect(() => {
      if (this.showForm) {
        this.form.patchValue(this.item ?? {});
      }
    });
  }

  ngOnInit(): void {
    this.getAllDebtManagerUsers();
  }

  onSubmit() {
    let debt: DebtDto = this.form.value;

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

  getAllDebtManagerUsers() {
    this.#userService.getByProject("Debt Manager").subscribe((users: User[]) => {
      if (!!users.length) {
        this.users = users.filter(f => f.id != this.#authService.userId);
      }
    });
  }
}
