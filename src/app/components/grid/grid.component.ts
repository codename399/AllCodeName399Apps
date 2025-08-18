import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  effect,
  inject,
  input,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PAGINATION_REQUEST } from '../../../injectors/common-injector';
import { SharedModule } from '../../../shared-module';
import { GridService } from '../authentication/services/grid.service';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Constants } from '../../../constants';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
import { PagedResponse } from '../../models/paged-response';

@Component({
  selector: 'app-grid',
  imports: [SharedModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent<I> implements AfterViewInit {
  #gridService = inject(GridService<I>);
  #paginationRequest = inject(PAGINATION_REQUEST);
  #loaderService = inject(LoaderService);
  #toastService = inject(ToastService);

  showAdd = input(true);
  showEdit = input(true);
  showDelete = input(true);
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
    if (!this.#gridService.service) {
      this.#gridService.paginationRequest = this.#paginationRequest;
    }

    this.searchInput.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (!term || term.length < 0) {
          return of([]);
        }

        this.#gridService.paginationRequest.field = Constants.name;
        this.#gridService.paginationRequest.value = term;
        return this.#gridService.getAll();
      })
    ).subscribe((result => {
      this.dataSource.data = this.#gridService.pagedResponse?.items ?? [];
    }))

    effect(() => {
      this.dataSource.data = this.#gridService.pagedResponse?.items ?? [];
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    if (this.paginator) {
      this.paginator.page.subscribe((event: any) => {
        this.#gridService.paginationRequest = event;
        this.#gridService.getAll();
      });
    }
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

  getAll() {
    this.#loaderService.show();

    this.#gridService.getAll().subscribe({
      next: (pagedResponse: PagedResponse<I>) => {
        this.#gridService.pagedResponse = pagedResponse;
        this.#loaderService.hide();
      },
    });
  }

  add() {
    this.#loaderService.show();
    this.#gridService.showForm = true;
    this.#gridService.add().subscribe({
      next: () => {
        this.showForm = false;
        window.location.reload();
        this.#toastService.success('Added successfully');
      },
    });
  }

  edit() {
    this.#loaderService.show();
    this.item = this.selection.selected[0];
    this.#gridService.showForm = true;

    this.#gridService.update().subscribe({
      next: () => {
        this.showForm = false;
        this.item = null;
        window.location.reload();
        this.#toastService.success('Updated successfully');
      },
    });
  }

  delete() {
    this.#loaderService.show();

    this.#gridService.delete(this.selection.selected).subscribe({
      next: () => {
        this.getAll();
        this.#toastService.success('Deleted successfully');
      },
    });
  }
}
