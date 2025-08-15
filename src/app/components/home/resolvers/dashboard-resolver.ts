import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ProjectService } from '../../authentication/services/project-service';
import { PaginationRequest } from '../../../models/pagination-request';
import { PAGINATION_REQUEST } from '../../../../injectors/common-injector';
import { map } from 'rxjs';
import { PagedResponse } from '../../../models/paged-response';
import { Project } from '../../authentication/models/project';

@Injectable({
  providedIn: 'root',
})
export class DashboardResolver implements Resolve<any> {
  #projectService = inject(ProjectService);
  #paginationRequest = inject(PAGINATION_REQUEST);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.#projectService
      .getAll(this.#paginationRequest)
      .pipe(map((projects) => projects.items));
  }
}
