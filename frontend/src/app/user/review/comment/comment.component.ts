import { Component, Input } from '@angular/core';
import { Review } from '../../../classes/Review';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input()
  review: Review | undefined;

  constructor(private router: Router) { }
}
