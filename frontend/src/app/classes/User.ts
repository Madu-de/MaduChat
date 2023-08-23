import { Chat } from "./Chat";
import { Settings } from "./Settings";

export class User {
  id: string;
  username: string;
  name: string;
  image: string;
  chats?: Chat[];
  friendRequestsSent?: User[];
  friendRequetsRecieved?: User[];
  friends?: User[];
  settings?: Settings;

  constructor(id: string, username: string, name: string, image: string) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.image = image;
  }
}
