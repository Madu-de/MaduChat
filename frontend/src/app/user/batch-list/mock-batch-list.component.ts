import { Component, Input } from '@angular/core';
import { User } from '../../classes/User';

@Component({
  selector: 'app-batch-list',
  template: 'MOCK COMPONENT'
})
export class MockBatchListComponent {
  @Input()
  user: User | undefined;
}
