import { Component } from '@angular/core';
import { User } from 'src/app/classes/User';

@Component({
  selector: 'friends-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.scss']
})
export class FindFriendsComponent {
  users: User[] = [
    new User('John', '@john', 'John', ''),
    new User('Mario', '@mario', 'Mario', ''),
  ];
}
