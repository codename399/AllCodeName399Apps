import { Component, input, model, output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Audit } from '../../models/audit';

@Component({
  selector: 'app-grid',
  standalone: false,
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent {
  tableName = input.required<string>();
  items = input.required<any[]>();
  displayedColumns = input.required<string[]>();
  add = output<void>();

  currentPage = model<number>(1);
  pageSize = model<number>(5);

  pagedItems: Audit[] = [];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.data = this.items();
    this.dataSource.paginator = this.paginator;
  }

  goToAdd() {
    this.add.emit();
  }
}
