import { Role } from './role';
import { User } from './user';

export interface LoginResponse {
  user: User;
  role: Role;
  token: string;
}
