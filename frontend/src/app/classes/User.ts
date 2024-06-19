import { Chat } from "./Chat";
import { Review } from "./Review";
import { ReviewStats } from "./ReviewStats";
import { Settings } from "./Settings";

export class User {
  id: string;
  username: string;
  name: string;
  image: string;
  isVerified: boolean;
  isAdmin: boolean;
  isOnline: boolean;
  chats?: Chat[];
  friendRequestsSent?: User[];
  friendRequetsReceived?: User[];
  friends?: User[];
  settings?: Settings;
  writtenReviews?: Review[];
  receivedReviews?: Review[];
  reviewStats?: ReviewStats;

  constructor(id: string, username: string, name: string, image: string, isVerified: boolean, isAdmin: boolean, isOnline: boolean) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.image = image;
    this.isVerified = isVerified;
    this.isAdmin = isAdmin;
    this.isOnline = isOnline;
  }
}
