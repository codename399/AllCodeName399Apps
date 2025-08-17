import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../authentication/models/project';
import { Constants } from '../../../../../constants';
import { SharedModule } from '../../../../../shared-module';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  #route = inject(ActivatedRoute);

  projects: Project[] = [];

  ngOnInit(): void {
    this.projects = this.#route.snapshot.data['projects'];
  }
}
