import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Role } from '../models/role';
import { Observable } from 'rxjs';
import { ApiConstants } from '../../../../api-constants';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  #httpClient = inject(HttpClient);

  getAll(request: Request): Observable<Role[]> {
    return this.#httpClient.post<Role[]>(
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
