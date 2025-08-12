import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { RoleService } from '../../authentication/services/role-service';

@Injectable({
  providedIn: 'root',
})
export class RoleResolver implements Resolve<any> {
  #roleService = inject(RoleService);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.#roleService.getAll();
  }
}
