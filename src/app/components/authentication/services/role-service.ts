import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Role } from '../models/role';
import { Observable } from 'rxjs';
import { ApiConstants } from '../../../../api-constants';
import { PaginationRequest } from '../../../models/pagination-request';
import { PagedResponse } from '../../../models/paged-response';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  #httpClient = inject(HttpClient);

  getAll(request: PaginationRequest): Observable<PagedResponse<Role>> {
    return this.#httpClient.post<PagedResponse<Role>>(
      ApiConstants.getUrl(ApiConstants.getAllRoles, true),
      request
    );
  }

  add(role: Role) {
    return this.#httpClient.post(
      ApiConstants.getUrl(ApiConstants.addRoles, true),
      role
    );
  }

  update(role: Role) {
    return this.#httpClient.put(
      ApiConstants.getUrl(ApiConstants.updateRole, true),
      role
    );
  }

  delete(roleIds: string[]) {
    return this.#httpClient.post(
      ApiConstants.getUrl(ApiConstants.deleteRole, true),
      roleIds
    );
  }
}
