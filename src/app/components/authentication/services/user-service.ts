import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, Observable } from 'rxjs';
import { ChangePasswordRequest } from '../models/change-password-request';
import { ApiConstants } from '../../../../api-constants';
import { PagedResponse } from '../../../models/paged-response';
import { PaginationRequest } from '../../../models/pagination-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #httpClient = inject(HttpClient);

  getAll(
    paginationRequest: PaginationRequest
  ): Observable<PagedResponse<User>> {
    return this.#httpClient.post<PagedResponse<User>>(
      ApiConstants.getUrl(ApiConstants.getAllUsers, true),
      paginationRequest
    );
  }

  getById(userId: string): Observable<User[]> {
    return this.#httpClient.get<User[]>(
      ApiConstants.getUrl(ApiConstants.getUserById, true) + '?id=' + userId
    );
  }

  add(user: User) {
    return this.#httpClient.post(
      ApiConstants.getUrl(ApiConstants.addUsers, true),
      user
    );
  }

  update(user: User) {
    return this.#httpClient.put(
      ApiConstants.getUrl(ApiConstants.updateUser, true),
      user
    );
  }

  delete(userIds: string[]) {
    return this.#httpClient.post(
      ApiConstants.getUrl(ApiConstants.deleteUser, true),
      userIds
    );
  }

  changePassword(changePasswordRequest: ChangePasswordRequest) {
    return this.#httpClient.post(
      ApiConstants.getUrl(ApiConstants.changePassword, true),
      changePasswordRequest
    );
  }
}
