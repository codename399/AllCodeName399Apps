import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { RoleService } from '../../authentication/services/role-service';
import { PaginationRequest } from '../../../models/pagination-request';

@Injectable({
  providedIn: 'root',
})
export class RoleResolver implements Resolve<any> {
  #roleService = inject(RoleService);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let paginationRequest: PaginationRequest = new PaginationRequest();
    return this.#roleService.getAll(paginationRequest);
  }
}
