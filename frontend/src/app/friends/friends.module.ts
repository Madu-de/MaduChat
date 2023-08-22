import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends.component';
import { FindFriendsComponent } from './find-friends/find-friends.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    FriendsComponent,
    FindFriendsComponent,
    FriendsListComponent,
    FriendRequestsComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
  ],
  exports: [FriendsComponent]
})
export class FriendsModule { }
