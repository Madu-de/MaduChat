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
import { UserComponent } from './user-list/user/user.component';

@NgModule({
  declarations: [
    FriendsComponent,
    FindFriendsComponent,
    FriendsListComponent,
    FriendRequestsComponent,
    UserListComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
  ],
  exports: [
    FriendsComponent, 
    UserListComponent
  ]
})
export class FriendsModule { }
