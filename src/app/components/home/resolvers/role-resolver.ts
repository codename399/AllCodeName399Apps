import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { RoleService } from '../../authentication/services/role-service';
import { PaginationRequest } from '../../../models/pagination-request';
import { PAGINATION_REQUEST } from '../../../../injectors/common-injector';

@Injectable({
  providedIn: 'root',
})
export class RoleResolver implements Resolve<any> {
  #roleService = inject(RoleService);
  #paginationRequest= inject(PAGINATION_REQUEST);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.#roleService.getAll(this.#paginationRequest);
  }
}
