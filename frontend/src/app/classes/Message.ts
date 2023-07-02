import { User } from "./User";

export class Message {
  message: string;
  sender: User;

  constructor(message: string, sender: User) {
    this.message = message;
    this.sender = sender;
  }
}