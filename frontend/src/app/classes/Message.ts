import { Chat } from "./Chat";
import { User } from "./User";

export interface Message {
  message: string;
  author: User;
  chat: Chat;
  createdAt: string;
  id: string;
  history: string[];
}
