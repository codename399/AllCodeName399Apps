import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  effect,
  inject,
  model,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GridService } from '../authentication/services/grid.service';
import {
  getErrorMessage,
  isInvalid,
} from '../../../validators/field-validator';
import { PAGINATION_REQUEST } from '../../../injectors/common-injector';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-grid',
  standalone: false,
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent<I> implements AfterViewInit {
  protected router = inject(Router);
  protected gridService = inject(GridService<I>);

  #paginationRequest = inject(PAGINATION_REQUEST);
  protected toastService = inject(ToastService);
  protected loaderService = inject(LoaderService);

  pagedItems: any[] = [];
  item!: I | null;

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  get getErrorMessage() {
    return getErrorMessage;
  }

  get isInvalid() {
    return isInvalid;
  }

  get length() {
    return this.gridService.pagedResponse?.count;
  }

  get pageSize() {
    return this.gridService.paginationRequest.limit;
  }

  get currentPage() {
    return this.gridService.paginationRequest.skip / this.pageSize + 1;
  }

  get showForm() {
    return this.gridService.showForm;
  }

  get displayedColumns() {
    return this.gridService.displayedColumns;
  }

  set showForm(value: boolean) {
    this.gridService.showForm = value;
  }

  set displayedColumns(value: string[]) {
    this.gridService.displayedColumns = value;
  }

  constructor() {
    this.gridService.paginationRequest = this.#paginationRequest;

    effect(() => {
      this.dataSource.data = this.gridService.pagedResponse?.items ?? [];
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    if (this.paginator) {
      this.paginator.page.subscribe((response: any) => {
        this.gridService.paginationRequest = response;
        this.gridService.getAll();
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

  onAdd() {
    this.gridService.showForm = true;
    this.gridService.add(this.item);
  }

  onDelete() {
    this.gridService.delete(this.selection.selected);
  }

  onEdit() {
    this.item = this.selection.selected[0];
    this.gridService.showForm = true;
    this.gridService.update(this.item);
    this.item = null;
  }

  goToDashboard() {
    this.router.navigate(['/home']);
  }
}
