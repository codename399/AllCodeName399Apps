import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../authentication/models/project';
import { Constants } from '../../../../../constants';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  #route = inject(ActivatedRoute);
  imageUrl = Constants.defaultProfileUrl;

  projects: Project[] = [];

  ngOnInit(): void {
    this.projects = this.#route.snapshot.data['projects'];
  }
}
