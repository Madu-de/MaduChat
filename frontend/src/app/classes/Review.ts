import { User } from "./User";

export interface Review {
  id: string;
  author: User;
  target: User;
  text: string;
  stars: number;
  createdAt: Date;
  updatedAt: Date;
}