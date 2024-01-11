import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MessageComponent } from './message/message.component';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserModule } from '../user/user.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { EditMessagePopupComponent } from './message/edit-message-popup/edit-message-popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ChatComponent,
    MessageComponent,
    EditMessagePopupComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    RouterModule,
    MatProgressBarModule,
    UserModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class ChatModule { }
