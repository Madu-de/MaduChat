import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/classes/Message';
import { Settings } from 'src/app/classes/Settings';
import { UserService } from 'src/app/services/user.service';
import {MatDialog} from "@angular/material/dialog";
import {EditMessagePopupComponent} from "./edit-message-popup/edit-message-popup.component";
import {AuthService} from "../../services/auth.service";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'chat-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input()
  message: Message | undefined;

  @Input()
  settings: Settings | undefined;

  @Input()
  user: string | undefined;

  constructor(private userService: UserService, private dialog: MatDialog, private auth: AuthService, public languageService: LanguageService) {}

  ngOnInit() {
    this.userService.getUserProfilePicture(this.message?.author?.id || '').subscribe(image => {
      if (!this.message) return;
      this.message.author.image = image;
    });
    this.auth.websocket?.on('messageEdited', (callback: { message: string, id: string }) => {
      if (this.message?.id === callback.id) {
        if (!this.message?.history?.length) {
          this.message.history.push(this.message.message);
        }
        this.message.message = callback.message;
      }
    });
  }

  isMenuVisible(): boolean {
    return this.canEditMessage();
  }

  canEditMessage(): boolean {
    return this.message?.author?.id === this.user;
  }

  editMessage() {
    if (this.message?.id) {
      this.dialog.open(EditMessagePopupComponent, {
        data: {
          message: this.message
        }
      }).afterClosed().subscribe(editedMessage => {
        if (editedMessage && this.message?.id) {
          this.auth.websocket?.emit('editMessage', { message: editedMessage, messageid: this.message.id })
        }
      })
    }
  }
}
