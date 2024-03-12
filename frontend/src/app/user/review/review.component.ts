import { Component, Input } from '@angular/core';
import { User } from 'src/app/classes/User';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input()
  clientUser: User | undefined;

  ngOnInit() {
    console.log(this.clientUser);
  }
}
