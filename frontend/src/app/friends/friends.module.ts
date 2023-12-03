import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends.component';
import { FindFriendsComponent } from './find-friends/find-friends.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { UserListComponent } from './user-list/user-list.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FriendUserComponent } from './user-list/friend-user/friend-user.component';
import { BasicNeedsModule } from '../basic-needs/basic-needs.module';

@NgModule({
  declarations: [
    FriendsComponent,
    FindFriendsComponent,
    FriendsListComponent,
    FriendRequestsComponent,
    UserListComponent,
    FriendUserComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressBarModule,
    BasicNeedsModule
  ],
  exports: [
    FriendsComponent, 
  ]
})
export class FriendsModule { }
