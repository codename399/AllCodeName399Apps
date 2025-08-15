import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ProjectService } from '../../authentication/services/project-service';
import { PaginationRequest } from '../../../models/pagination-request';

@Injectable({
  providedIn: 'root',
})
export class ProjectResolver implements Resolve<any> {
  #projectService = inject(ProjectService);
  #paginationRequest = inject(PaginationRequest);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.#projectService.getAll(this.#paginationRequest);
  }
}
