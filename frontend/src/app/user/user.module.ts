import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { BadgeListComponent } from './badge-list/badge-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReviewComponent } from './review/review.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CommentComponent } from './review/comment/comment.component';
import { StarsComponent } from './review/comment/stars/stars.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateReviewMockComponent } from './review/create-review-mock/create-review-mock.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    UserComponent,
    BadgeListComponent,
    ReviewComponent,
    CommentComponent,
    StarsComponent,
    CreateReviewMockComponent,
    StatsComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatTooltipModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatListModule,
    RouterLink,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [
    BadgeListComponent
  ]
})
export class UserModule { }
