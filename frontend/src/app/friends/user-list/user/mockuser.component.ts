import { Component, Input } from '@angular/core';
import { User } from 'src/app/classes/User';

@Component({
  selector: 'user-list-user',
  template: 'MOCK COMPONENT',
})
export class MockUserComponent {
  @Input()
  user: User | undefined;

  @Input()
  clientUser: User | undefined;
}
