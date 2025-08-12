import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../authentication/models/user';
import { SharedModule } from '../../../../../shared-module';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  #route = inject(ActivatedRoute);
  users: User[] = [];
  columns: string[] = ['Name', 'Username', 'EmailId', 'ContactNumber'];

  constructor() {
    this.users = this.#route.snapshot.data['users'];
  }
}
