import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ProjectService } from '../../authentication/services/project-service';

@Injectable({
  providedIn: 'root',
})
export class DashboardResolver implements Resolve<any> {
  #projectService = inject(ProjectService);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.#projectService.getAll();
  }
}
