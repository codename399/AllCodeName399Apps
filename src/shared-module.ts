import { CommonModule, DatePipe, LowerCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTableModule
} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CamelCasePipe } from './app/pipes/camelcase-pipe';
import { NoSpacePipe } from './app/pipes/nospace-pipe';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'

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
    MatNativeDateModule
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
    MatNativeDateModule
  ],
  providers: []
})
export class SharedModule { }
