import { Component, ElementRef, HostListener, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/classes/User';
import { CreateReviewMockComponent } from './create-review-mock/create-review-mock.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Review } from 'src/app/classes/Review';
import { UserService } from 'src/app/services/user.service';
import { catchError, of } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { ReviewService } from 'src/app/services/review.service';
import { ScrollService } from 'src/app/services/scroll.service';

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

  @ViewChild('loadingElement', { static: false }) loadingElement!: ElementRef;

  reviewWrittenByClientUser: Review | undefined;

  constructor(
    private dialog: MatDialog, 
    private snackbar: SnackbarService, 
    private userService: UserService,
    public languageService: LanguageService,
    private reviewService: ReviewService,
    private scrollService: ScrollService,
  ) {}

  ngOnInit() {
    this.scrollService.onScroll.subscribe(() => {
      const windowHeight = window.innerHeight;
      const boundedRect = this.loadingElement.nativeElement.getBoundingClientRect();

      if (boundedRect.top >= 0 && boundedRect.bottom <= windowHeight) {
        this.loadMoreReviews();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] === undefined || this.user === undefined) return;
    this.userService.getMyReviewOfTarget(this.user!.id)
      .pipe(
        catchError(() => {
          return of(undefined);
        })
      )
      .subscribe((review) => {
        this.reviewWrittenByClientUser = review;
      });
  }

  openMock() {
    this.dialog.open(CreateReviewMockComponent, {
      hasBackdrop: true,
      width: '500px',
      data: {
        targetid: this.user?.id,
        review: this.reviewWrittenByClientUser,
      }
    }).afterClosed().subscribe((data: Review) => {
      if (!data) return;
      if (this.reviewWrittenByClientUser) {
        this.snackbar.open(this.languageService.getValue('youEditedYourReview'));
        this.user!.receivedReviews = this.user?.receivedReviews?.filter(r => r.id !== this.reviewWrittenByClientUser?.id)
        this.user!.receivedReviews?.push(data);
        this.updateOverview(this.reviewWrittenByClientUser.stars, -1);
        this.updateOverview(data.stars, 1);
        this.reviewWrittenByClientUser = data;
        return;
      }
      this.snackbar.open(this.languageService.getValue('youWroteAReview'));
      this.user?.receivedReviews?.push(data);
      this.reviewWrittenByClientUser = data;
      this.updateOverview(data.stars, 1);
    });
  }

  deleteReview() {
    this.userService.deleteReview(this.user!.id).subscribe(data => {
      this.user!.receivedReviews = this.user?.receivedReviews?.filter((review) => review.author.id !== this.clientUser!.id);
      this.reviewWrittenByClientUser = undefined;
      this.updateOverview(data.stars, -1);
      this.snackbar.open(this.languageService.getValue('youRemovedYourReview'), this.languageService.getValue('undo'))
        .onAction()
        .subscribe(() => {
          this.userService.createReview(data.target.id, data.text, data.stars).subscribe((data) => {
            this.user!.receivedReviews?.push(data);
            this.reviewWrittenByClientUser = data;
            this.updateOverview(data.stars, 1);
          });
        });
    });
  }

  loadMoreReviews() {
    this.reviewService.getRecivedReviews(this.user!.id, this.user!.receivedReviews!.length).subscribe((reviews) => {
      console.log(reviews);
      this.user!.receivedReviews = [...this.user!.receivedReviews!,...reviews];
    });
  }

  updateOverview(stars: number, multiplier: number) {
    this.user!.reviewStats!.totalReceivedReviews += multiplier;
    this.user!.reviewStats!.totalReceivedStars += stars * multiplier;
    this.user!.reviewStats!.avarageReceivedStars = this.user!.reviewStats!.totalReceivedStars / this.user!.reviewStats!.totalReceivedReviews;
    switch (stars) {
      case 1:
        this.user!.reviewStats!.totalReceived1Star += multiplier;
        break;
      case 2:
        this.user!.reviewStats!.totalReceived2Stars += multiplier;
        break;
      case 3:
        this.user!.reviewStats!.totalReceived3Stars += multiplier;
        break;
      case 4:
        this.user!.reviewStats!.totalReceived4Stars += multiplier;
        break;
      case 5:
        this.user!.reviewStats!.totalReceived5Stars += multiplier;
        break;
      default:
        break;
    }
  }

  calcProgressbarValue(numberOfStars: number) {
    if (!this.user) return 0;
    if (!this.user.reviewStats) return 0;
    return (numberOfStars / this.user.reviewStats.totalReceivedReviews) * 100;
  }
}
