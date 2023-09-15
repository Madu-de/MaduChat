import { Chat } from "./Chat";
import { Settings } from "./Settings";

export class User {
  id: string;
  username: string;
  name: string;
  image: string;
  isVerified: boolean;
  isAdmin: boolean;
  chats?: Chat[];
  friendRequestsSent?: User[];
  friendRequetsReceived?: User[];
  friends?: User[];
  settings?: Settings;

  constructor(id: string, username: string, name: string, image: string, isVerified: boolean, isAdmin: boolean) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.image = image;
    this.isVerified = isVerified;
    this.isAdmin = isAdmin;
  }
}
