import { User } from './user';

export interface ChangePasswordRequest extends User {
  newPassword: string;
}
