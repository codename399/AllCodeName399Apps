import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../../../shared-module';
import { Project } from '../../models/project';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #router: Router = inject(Router);

  projects: Project[] = [];

  ngOnInit(): void {
    this.projects = this.#route.snapshot.data['projects'];

    if (this.projects?.length == 1) {
      this.#router.navigate([this.projects[0].route]);
    }
  }
}
