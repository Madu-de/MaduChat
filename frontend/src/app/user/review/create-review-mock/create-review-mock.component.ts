import { LanguageService } from './../../../services/language.service';
import { Component, Inject, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Review } from 'src/app/classes/Review';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-review-mock',
  templateUrl: './create-review-mock.component.html',
  styleUrl: './create-review-mock.component.scss'
})
export class CreateReviewMockComponent {

  review: FormGroup = new FormGroup({
    text: new FormControl(this.data.review?.text || ''),
  });

  stars: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { targetid: string, review?: Review },
    public dialogRef: MatDialogRef<CreateReviewMockComponent>,
    public languageService: LanguageService,
    public userService: UserService,
  ) { }

  ngAfterViewInit(): void {
    if (!this.data.review) return;
    this.setCurrentStars(this.data.review.stars);
  }

  send() {
    if (this.data.review) {
      this.userService.deleteReview(this.data.targetid).subscribe(data => {
        this.createReview();
      });
      return;
    }
    this.createReview();
  }

  private createReview() {
    this.userService.createReview(this.data.targetid, this.review.controls['text'].value, this.stars).subscribe(data => {
      this.dialogRef.close(data);
    });
  }

  setCurrentStars(index: number) {
    this.stars = index;
    for (let i = 1; i <= 5; i++) {
      const el = <HTMLElement>document.getElementById('star-' + i);
      if (i <= this.stars) {
        el.innerHTML = 'star';
      } else {
        el.innerHTML = 'star_outline';
      }
    }
  }
}
