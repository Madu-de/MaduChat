import { Component, Input } from '@angular/core';
import { User } from 'src/app/classes/User';

@Component({
  selector: 'friends-friends-list',
  template: 'MOCK COMPONENT',
})
export class MockFriendsListComponent {
  @Input()
  user: User | undefined;
}
