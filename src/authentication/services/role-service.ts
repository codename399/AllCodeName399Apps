import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Constants } from '../../constants';
import { Role } from '../models/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  #httpClient = inject(HttpClient);

  getAll(): Observable<Role[]> {
    return this.#httpClient.get<Role[]>(
      Constants.getUrl(Constants.getAllRoles, true)
    );
  }

  add(role: Role) {
    return this.#httpClient.post(Constants.getUrl(Constants.addRoles, true), [
      role,
    ]);
  }

  update(role: Role) {
    return this.#httpClient.put(
      Constants.getUrl(Constants.updateRole, true),
      role
    );
  }

  delete(roleId: string) {
    return this.#httpClient.delete(
      Constants.getUrl(Constants.deleteRole, true) + '/' + roleId
    );
  }
}
