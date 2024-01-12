import { User } from "./User";

export interface Chat {
  id: string;
  name: string;
  isPublic: boolean;
  isAdminChat: boolean;
  members?: User[];
  admins?: User[];
}