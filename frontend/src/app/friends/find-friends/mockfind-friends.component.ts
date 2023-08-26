import { Component, Input } from '@angular/core';
import { User } from 'src/app/classes/User';

@Component({
  selector: 'friends-find-friends',
  template: 'MOCK COMPONENT',
})
export class MockFindFriendsComponent {
  @Input()
  user: User | undefined;
}
