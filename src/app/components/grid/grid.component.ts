import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  effect,
  inject,
  input,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Config } from '../../../assets/environments/config';
import { Constants } from '../../../constants';
import { SharedModule } from '../../../shared-module';
import { OperatorType } from '../../models/enums/operator-type.enum';
import { PagedResponse } from '../../models/paged-response';
import { ToastService } from '../../services/toast.service';
import { GridService } from '../authentication/services/grid.service';
import { DialogComponent } from '../dialog/dialog.component';
import { PaginationRequest } from '../../models/pagination-request';

@Component({
  selector: 'app-grid',
  imports: [SharedModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent<I> implements AfterViewInit {
  #gridService = inject(GridService<I>);
  #toastService = inject(ToastService);
  #dialog = inject(MatDialog);
  #config = inject(Config);

  showAdd = input(true);
  showEdit = input(true);
  showDelete = input(true);
  showDeleteAll = input(true);
  showSearch = input(true);

  pagedItems: any[] = [];
  searchInput: FormControl = new FormControl('');

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  get length() {
    return this.#gridService.pagedResponse?.count;
  }

  get pageSize() {
    return this.#gridService.paginationRequest.limit;
  }

  get currentPage() {
    return this.#gridService.paginationRequest.skip / this.pageSize + 1;
  }

  get showForm() {
    return this.#gridService.showForm;
  }

  get displayedColumns() {
    return this.#gridService.displayedColumns;
  }

  get item() {
    return this.#gridService.item;
  }

  get gridService() {
    return this.#gridService;
  }

  get enableMultiSelection() {
    return this.#config.enableMultiSelection;
  }

  set showForm(value: boolean) {
    this.#gridService.showForm = value;
  }

  set displayedColumns(value: string[]) {
    this.#gridService.displayedColumns = value;
  }

  set item(value: I | null) {
    this.#gridService.item = value;
  }

  constructor() {
    if (!this.#config.enableMultiSelection) {
      this.displayedColumns = this.displayedColumns.filter(f => f != "select");
    }

    if (!this.displayedColumns.includes("action")) {
      this.displayedColumns.push("action")
    }

    this.searchInput.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (!term || term.length < 0) {
          this.#gridService.paginationRequest.filters = null;
        }
        else {
          this.#gridService.paginationRequest.filters = [
            {
              key: Constants.name,
              value: term,
              operator: OperatorType.Like
            }
          ]
        }

        return this.#gridService.getAll();
      })
    ).subscribe((result => {
      this.#gridService.pagedResponse = result as PagedResponse<I>;
      this.dataSource.data = this.#gridService.pagedResponse?.items ?? [];
    }))

    effect(() => {
      this.dataSource.data = this.#gridService.pagedResponse?.items ?? [];
    });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: any) => {
      this.#gridService.paginationRequest = event;
      this.getAll();
    });
  }

  /** Whether all rows are selected. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  onSort(event: any) {
    this.#gridService.paginationRequest.sortBy = event.active;
    this.#gridService.paginationRequest.ascending = event.direction == "asc";

    this.getAll();
  }

  getAll() {
    this.#gridService.getAll().subscribe({
      next: (pagedResponse: PagedResponse<I>) => {
        this.#gridService.pagedResponse = pagedResponse;
        this.selection.clear();
      },
    });
  }

  add() {
    this.showForm = true;
  }

  edit(item: I) {
    this.item = item;
    this.showForm = true;
  }

  openDeleteConfirmation(item?: I) {
    const dialogRef = this.#dialog.open(DialogComponent, {
      width: '350px',
      data: { title: 'Confirm Delete', message: 'Are you sure you want to delete this user?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(item);
      }
    });
  }

  delete(item?: I) {
    let items: I[] = item ? [item] : this.selection.selected;

    this.#gridService.delete(items).subscribe({
      next: () => {
        this.getAll();
        this.#toastService.success('Deleted successfully');
      },
    });
  }
}
