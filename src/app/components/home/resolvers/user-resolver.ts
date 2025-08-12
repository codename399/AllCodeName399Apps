import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../../authentication/services/user-service';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<any> {
  #userService = inject(UserService);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.#userService.getAll();
  }
}
