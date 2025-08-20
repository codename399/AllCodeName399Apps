import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../../../shared-module';
import { Project } from '../../../authentication/models/project';
import { User } from '../../../authentication/models/user';

@Component({
  selector: 'app-user-project-mapping',
  imports: [SharedModule],
  templateUrl: './user-project-mapping.component.html',
  styleUrl: './user-project-mapping.component.css'
})
export class UserProjectMappingComponent {
  #route = inject(ActivatedRoute);

  users: User[] = [];
  projects: Project[] = [];
  user: FormControl = new FormControl(null);

  constructor() {
    this.users = this.#route.snapshot.data["usersandprojects"][0]?.items;
    this.projects = this.#route.snapshot.data["usersandprojects"][1]?.items;

    this.user.valueChanges.subscribe((event) => {
      console.log("event", event);
    })
  }
}
