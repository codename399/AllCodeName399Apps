import { Component, effect, inject, ViewChild } from '@angular/core';
import { GameDetail } from '../../models/game-detail';
import { GameStashService } from '../../services/game-stash-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getErrorMessage, isInvalid } from '../../../../../validators/field-validator';
import { ToastService } from '../../../../services/toast.service';
import { GridService } from '../../../authentication/services/grid.service';
import { GridComponent } from '../../../grid/grid.component';
import { SharedModule } from '../../../../../shared-module';
import { Status } from '../../models/enum/status-enum';
import { Website } from '../../models/enum/website-enum';
import { PagedResponse } from '../../../../models/paged-response';
import { PaginationRequest } from '../../../../models/pagination-request';
import { DialogComponent } from '../../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from '../../../../../constants';
import { OperatorType } from '../../../../models/enums/operator-type.enum';

@Component({
  selector: 'app-game-stash',
  imports: [GridComponent, SharedModule],
  templateUrl: './game-stash.component.html',
  styleUrl: './game-stash.component.css',
  providers: [GridService]
})
export class GameStashComponent {
  #formBuilder = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  #toastService = inject(ToastService);
  #gridService = inject(GridService<GameDetail>);
  #gameStashService = inject(GameStashService);
  #dialog = inject(MatDialog);

  form: FormGroup;
  statuses: string[] = Object.keys(Status);
  websites: string[] = Object.keys(Website);
  gameDetail!: GameDetail | null;

  @ViewChild(GridComponent) gridComponent!: GridComponent<GameDetail>;

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

  set item(value: GameDetail | null) {
    this.#gridService.item = value;
  }

  set showForm(value: boolean) {
    this.#gridService.showForm = value;
  }

  constructor() {
    this.#gridService.service = GameStashService;
    this.#gridService.pagedResponse =
      this.#route.snapshot.data['pagedResponse'];
    this.#gridService.displayedColumns = ['select', 'Name', 'Status', 'Website', 'Start Date', 'Archive Date', 'Completion Date'];

    this.form = this.#formBuilder.group({
      name: ['', [Validators.required]],
      status: [Status.Added, [Validators.required]],
      website: ['', [Validators.required]],
      startDate: [null],
      archiveDate: [null],
      completionDate: [null]
    });

    effect(() => {
      if (this.showForm) {
        this.form.patchValue(this.item ?? {});
      }
    });
  }

  onSubmit() {
    let gameDetail: GameDetail = this.form.value;

    if (this.form.valid) {
      if (this.item) {
        gameDetail.id = this.item.id;
        this.item = gameDetail;

        this.#gridService.update();
      } else {
        this.item = gameDetail;
        this.#gridService.add(false);
      }
    } else {
      this.#toastService.error('Invalid form.');
    }
  }

  refresh() {
    window.location.reload();
  }

  getRandomGame() {
    let paginationRequest: PaginationRequest = {
      filters: [
        {
          key: Constants.status,
          value: Status.Added,
          operator: OperatorType.Equal
        }
      ],
      fetchAll: true,
      ascending: false,
      isDeleted: false
    };

    this.#gameStashService.getAll(paginationRequest).subscribe((response: PagedResponse<GameDetail>) => {
      const index = Math.floor(Math.random() * response.items.length);
      this.gameDetail = response.items[index];
      if (this.gameDetail) {
        this.openGameDialog();
      }
    })
  }

  openGameDialog() {
    const dialogRef = this.#dialog.open(DialogComponent, {
      width: '350px',
      data: { title: 'Hope you enjoy this!!', message: this.gameDetail?.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.gameDetail != null) {
          this.gameDetail.status = Status.Started;
          this.gameDetail.startDate = new Date();
        }

        this.item = this.gameDetail;
        this.#gridService.update();
      }
    });
  }
}
