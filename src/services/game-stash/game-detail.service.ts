import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Constants } from '../../constants';
import { Observable } from 'rxjs';
import { Status } from '../../model/game-stash/enum/status.enum';
import { GameDetail } from '../../model/game-stash/game-detail';

@Injectable({
  providedIn: 'root'
})
export class GameDetailService {
  httpClient = inject(HttpClient);

  getAll(): Observable<GameDetail[]> {
    return this.httpClient.get<GameDetail[]>(Constants.getAll);
  }

  getByStatus(statuses: Status[]) {
    return this.httpClient.post<GameDetail[]>(Constants.getByStatus, statuses);
  }

  add(gameDetails: GameDetail[]) {
    return this.httpClient.post(Constants.add, gameDetails);
  }

  update(gameDetail: GameDetail) {
    return this.httpClient.post(Constants.update, gameDetail);
  }

  delete(id: string) {
    return this.httpClient.delete(Constants.delete + '?id=' + id);
  }
}
