import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/User';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input()
  user: User | undefined;

  @Input()
  clientUser: User | undefined;
}
