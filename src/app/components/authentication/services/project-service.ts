import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { ApiConstants } from '../../../../api-constants';
import { PaginationRequest } from '../../../models/pagination-request';
import { PagedResponse } from '../../../models/paged-response';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  #httpClient = inject(HttpClient);

  getAll(request: PaginationRequest): Observable<PagedResponse<Project>> {
    return this.#httpClient.post<PagedResponse<Project>>(
      ApiConstants.getUrl(ApiConstants.getAllProjects, true),
      request
    );
  }

  getById(projectId: string): Observable<Project[]> {
    return this.#httpClient.get<Project[]>(
      ApiConstants.getUrl(ApiConstants.getProjectById, true) +
        '?id=' +
        projectId
    );
  }

  add(project: Project) {
    return this.#httpClient.post(
      ApiConstants.getUrl(ApiConstants.addProjects, true),
      project
    );
  }

  update(project: Project) {
    return this.#httpClient.put(
      ApiConstants.getUrl(ApiConstants.updateProject, true),
      project
    );
  }

  delete(projectIds: string[]) {
    return this.#httpClient.post(
      ApiConstants.getUrl(ApiConstants.deleteProject, true),
      projectIds
    );
  }
}
