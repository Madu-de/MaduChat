import { MatDialogModule } from '@angular/material/dialog';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MatCommonModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ListComponent } from './list/list.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { EditChatPopupComponent } from './edit-chat-popup/edit-chat-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FriendsModule } from 'src/app/friends/friends.module';
import { MatSelectModule } from '@angular/material/select';
import { BasicNeedsModule } from 'src/app/basic-needs/basic-needs.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { DeleteChatPopupComponent } from "./delete-chat-popup/delete-chat-popup.component";


@NgModule({
  declarations: [
    SidebarComponent,
    ListComponent,
    EditChatPopupComponent,
    DeleteChatPopupComponent
  ],
  imports: [
    CommonModule,
    MatCommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    FriendsModule,
    MatSelectModule,
    BasicNeedsModule,
    MatCheckboxModule,
    FormsModule,
    MatTooltipModule,
    MatBadgeModule,
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }