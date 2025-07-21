import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Status } from '../../../model/game-stash/enum/status.enum';
import { Website } from '../../../model/game-stash/enum/website.enum';
import { GameDetail } from '../../../model/game-stash/game-detail';
import { GameDetailService } from '../../../services/game-stash/game-detail.service';

@Component({
  selector: 'app-game-detail',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  gameDetailService = inject(GameDetailService);
  dataSource = new MatTableDataSource<GameDetail>([]);
  gameDetails = signal<GameDetail[]>([]);
  gameDetail = signal<GameDetail>({} as GameDetail);
  statuses = Object.values(Status);
  websites = Object.values(Website);
  displayedColumns = ["name", "status", "website", "action"];
  gameDetailForm: FormGroup;
  enableDelete = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.gameDetailForm = new FormGroup({
      name: new FormControl('', Validators.required),
      status: new FormControl(Status.Added, Validators.required),
      website: new FormControl(null),
      creationDate: new FormControl(new Date, Validators.required),
      startDate: new FormControl(null),
      archiveDate: new FormControl(null),
      completionDate: new FormControl(null),
    });
  }

  ngOnInit() {
    this.getAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAll(status?: Status, website?: Website) {
    this.gameDetailService.getAll().subscribe((gameDetails: GameDetail[]) => {
      this.gameDetails.set(status ? gameDetails.filter(f => f.status === status) : gameDetails);
      this.gameDetails.set(website ? this.gameDetails().filter(f => f.website === website) : this.gameDetails());
      this.dataSource.data = this.gameDetails();
    });
  }

  add() {
    if (this.gameDetailForm.valid) {
      const newGameDetail: GameDetail = this.gameDetailForm.value;
      this.gameDetailService.add([newGameDetail]).subscribe(() => {
        this.getAll();
        this.gameDetailForm.controls['name'].setValue('');
      });
    }
  }

  start(gameDetail: GameDetail) {
    gameDetail.status = Status.Started;
    gameDetail.startDate = new Date().toISOString();
    this.gameDetailService.update(gameDetail).subscribe(() => {
      this.getAll();
      this.gameDetail.set({} as GameDetail);
    });
  }

  archive(gameDetail: GameDetail) {
    gameDetail.status = Status.Archived;
    gameDetail.archiveDate = new Date().toISOString();
    this.gameDetailService.update(gameDetail).subscribe(() => {
      this.getAll();
    });
  }

  complete(gameDetail: GameDetail) {
    gameDetail.status = Status.Completed;
    gameDetail.completionDate = new Date().toISOString();
    this.gameDetailService.update(gameDetail).subscribe(() => {
      this.getAll();
    });
  }

  getRandom() {
    const pendingGames = this.gameDetails().filter(f => {
      return f.status === Status.Added;
    });

    this.gameDetail.set(pendingGames[Math.floor(Math.random() * pendingGames.length)]);
  }

  filterByStatus(status: Status) {
    this.getAll(status);
  }

  filterByWebsite(website: Website) {
    this.getAll(undefined, website);
  }

  searchByKeyword(keyword:string = ''){
    this.dataSource.filter = keyword.trim().toLowerCase();
  }

  delete(id:string) {
    this.gameDetailService.delete(id).subscribe(() => {
      this.getAll();
    });
  }
}
