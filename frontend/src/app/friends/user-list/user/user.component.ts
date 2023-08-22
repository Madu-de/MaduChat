import { Component, Input } from '@angular/core';
import { User } from 'src/app/classes/User';

@Component({
  selector: 'user-list-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input()
  user: User | undefined;
}
