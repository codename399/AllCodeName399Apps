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
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PAGINATION_REQUEST } from '../../../injectors/common-injector';
import { SharedModule } from '../../../shared-module';
import { GridService } from '../authentication/services/grid.service';

@Component({
  selector: 'app-grid',
  imports: [SharedModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent<I> implements AfterViewInit {
  #router = inject(Router);
  #gridService = inject(GridService<I>);
  #paginationRequest = inject(PAGINATION_REQUEST);

  showAdd =input(true);
  showEdit =input(true);
  showDelete =input(true);
  showSearch =input(true);

  pagedItems: any[] = [];

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!:MatTable<any>;

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

    effect(() => {
      this.dataSource.data = this.#gridService.pagedResponse?.items ?? [];
      
      // if(this.table){
      //   this.table.renderRows();
      // }
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

  add() {
    this.#gridService.showForm = true;
  }

  onDelete() {
    this.#gridService.delete(this.selection.selected);
  }

  edit() {
    this.item = this.selection.selected[0];
    this.#gridService.showForm = true;
  }

  goToDashboard() {
    this.#router.navigate(['/home']);
  }
}
