import { Component, inject } from '@angular/core';
import { Project } from '../../../authentication/models/project';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../../../shared-module';
import { PagedResponse } from '../../../../models/paged-response';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  #route = inject(ActivatedRoute);
  projects: Project[] = [];
  columns: string[] = ['Name', 'Description'];
  pagedResponse!:PagedResponse<Project>

  constructor() {
    this.pagedResponse = this.#route.snapshot.data['pagedResponse'];
  }
}
