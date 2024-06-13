import { Component, Input } from '@angular/core';
import { Review } from '../../../classes/Review';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input()
  review: Review | undefined;

  ngOnInit() {
    console.log(this.review);
  }
}
