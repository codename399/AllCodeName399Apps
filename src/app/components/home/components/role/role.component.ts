import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../../../shared-module';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../../authentication/models/role';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
})
export class RoleComponent {
  #route = inject(ActivatedRoute);
  roles: Role[] = [];
  columns: string[] = ['Name'];

  constructor() {
    this.roles = this.#route.snapshot.data['roles'];
  }
}
