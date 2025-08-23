import { CommonModule, DatePipe, LowerCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {
  MatTableModule
} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CamelCasePipe } from './app/pipes/camelcase-pipe';
import { NoSpacePipe } from './app/pipes/nospace-pipe';

@NgModule({
  declarations: [],
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
    MatDialogModule,
    NoSpacePipe,
    DatePipe,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    CamelCasePipe,
    MatCheckboxModule,
    MatDialogModule,
    NoSpacePipe,
    DatePipe,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule
  ],
  providers: []
})
export class SharedModule { }
