import { Chat } from "./Chat";
import { Settings } from "./Settings";

export class User {
  id: number;
  username: string;
  name: string;
  image: string;
  chats?: Chat[];
  friends?: User[];
  settings?: Settings;

  constructor(id: number, username: string, name: string, image: string) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.image = image;
  }
}
