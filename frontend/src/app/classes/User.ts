export class User {
  id: number;
  username: string;
  name: string;
  image: string;

  constructor(id: number, username: string, name: string, image: string) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.image = image;
  }
}
