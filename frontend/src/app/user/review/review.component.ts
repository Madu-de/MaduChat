import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/classes/User';
import { CreateReviewMockComponent } from './create-review-mock/create-review-mock.component';

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

  constructor(private dialog: MatDialog) {}

  openMock() {
    this.dialog.open(CreateReviewMockComponent, {
      hasBackdrop: true,
      data: {
        targetid: this.user?.id,
      }
    });
  }
}
