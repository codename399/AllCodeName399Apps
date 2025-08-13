import { CommonModule, LowerCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { GridComponent } from './app/components/grid/grid.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { CamelCasePipe } from './app/pipes/camelcase-pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [GridComponent],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
    LowerCasePipe,
    MatPaginatorModule,
    MatTableModule,
    CamelCasePipe,
    MatCheckboxModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    GridComponent,
    MatPaginatorModule,
    MatTableModule,
    CamelCasePipe,
    MatCheckboxModule,
  ],
  providers: [],
})
export class SharedModule {}
