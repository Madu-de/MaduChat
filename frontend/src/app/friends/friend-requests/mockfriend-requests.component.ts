import { Component, Input } from '@angular/core';
import { User } from 'src/app/classes/User';

@Component({
  selector: 'friends-friend-requests',
  template: 'MOCK COMPONENT',
})
export class MockFriendRequestsComponent {
  @Input()
  user: User | undefined;
}
