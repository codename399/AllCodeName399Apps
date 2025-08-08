import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Constants } from '../../constants';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #httpClient = inject(HttpClient);

  getAll(): Observable<User[]> {
    return this.#httpClient.get<User[]>(
      Constants.getUrl(Constants.getAllUsers, true)
    );
  }

  getById(userId: string): Observable<User[]> {
    return this.#httpClient.get<User[]>(
      Constants.getUrl(Constants.getUserById, true) + '/' + userId
    );
  }

  add(user: User) {
    return this.#httpClient.post(Constants.getUrl(Constants.addUsers, true), [
      user,
    ]);
  }

  update(user: User) {
    return this.#httpClient.put(
      Constants.getUrl(Constants.updateUser, true),
      user
    );
  }

  delete(userId: string) {
    return this.#httpClient.delete(
      Constants.getUrl(Constants.deleteUser, true) + '/' + userId
    );
  }
}
