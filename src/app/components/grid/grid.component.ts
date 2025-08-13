import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  input,
  model,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-grid',
  standalone: false,
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent implements OnInit, AfterViewInit {
  tableName = input.required<string>();
  items = input.required<any[]>();
  displayedColumns = model.required<string[]>();
  add = output<void>();
  delete = output<any[]>();

  currentPage = model<number>(1);
  pageSize = model<number>(5);

  pagedItems: any[] = [];

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.displayedColumns().unshift('select');
  }

  ngAfterViewInit() {
    this.dataSource.data = this.items();
    this.dataSource.paginator = this.paginator;
  }

  onAdd() {
    this.add.emit();
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

  onDelete() {
    this.delete.emit(this.selection.selected);
  }
}
