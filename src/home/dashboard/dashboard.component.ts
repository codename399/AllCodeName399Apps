import { Component, inject, OnInit } from '@angular/core';
import { Project } from '../../authentication/models/project';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
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
