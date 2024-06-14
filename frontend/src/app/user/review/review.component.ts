import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/classes/User';
import { CreateReviewMockComponent } from './create-review-mock/create-review-mock.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Review } from 'src/app/classes/Review';
import { UserService } from 'src/app/services/user.service';

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

  constructor(
    private dialog: MatDialog, 
    private snackbar: SnackbarService, 
    private userService: UserService
  ) {}

  openMock() {
    this.dialog.open(CreateReviewMockComponent, {
      hasBackdrop: true,
      data: {
        targetid: this.user?.id,
      }
    }).afterClosed().subscribe((data: Review) => {
      if (!data) return;
      this.snackbar.open('Du hast ' + this.user?.name + ' eine Rezension geschrieben!');
      this.user?.receivedReviews?.push(data);
    });
  }

  deleteReview() {
    this.userService.deleteReview(this.user!.id).subscribe(data => {
      this.user!.receivedReviews = this.user?.receivedReviews?.filter((review) => review.author.id !== this.clientUser!.id);
      this.snackbar.open('Du hast deine Rezension gelöscht!');
    });
  }
}
