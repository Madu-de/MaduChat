import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseUsersPopupComponent } from './choose-users-popup/choose-users-popup.component';
import { ListUserItem } from './list-user-item/list-user-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { UserModule } from '../user/user.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ChooseUsersPopupComponent,
    ListUserItem,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    UserModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    ChooseUsersPopupComponent,
    ListUserItem
  ]
})
export class BasicNeedsModule { }
