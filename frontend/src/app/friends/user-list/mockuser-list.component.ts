import { Component, Input } from '@angular/core';
import { User } from '../../classes/User';

@Component({
  selector: 'app-user-list',
  template: 'MOCK COMPONENT',
})
export class MockUserListComponent {
  @Input()
  users: User[] = [];

  @Input()
  clientUser: User | undefined;
}
