import { User } from "./User";

export interface Chat {
  id: string;
  name: string;
  members?: User[];
}