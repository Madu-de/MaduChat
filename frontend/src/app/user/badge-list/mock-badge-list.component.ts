import { Component, Input } from '@angular/core';
import { User } from '../../classes/User';

@Component({
  selector: 'app-badge-list',
  template: 'MOCK COMPONENT'
})
export class MockBadgeListComponent {
  @Input()
  user: User | undefined = new User('test', 'test', 'test', '', false, false, true);
}
