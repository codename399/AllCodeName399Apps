export interface User {
  id: string | null;
  name: string;
  username: string;
  password: string;
  emailId: string;
  contactNumber: string;
  roleId: string | null;
  profilePicture: string | null;
  creationDate: string;
  updationDate: string;
}
