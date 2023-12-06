import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/classes/Message';
import { Settings } from 'src/app/classes/Settings';
import { UserService } from 'src/app/services/user.service';
import {MatDialog} from "@angular/material/dialog";
import {EditMessagePopupComponent} from "./edit-message-popup/edit-message-popup.component";

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

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.userService.getUserProfilePicture(this.message?.author?.id || '').subscribe(image => {
      if (!this.message) return;
      this.message.author.image = image;
    });
  }

  editMessage() {
    this.dialog.open(EditMessagePopupComponent, {
      data: {
        message: this.message
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        // TODO: add anotation to the message that it was modified. How to know if a message was modified ? Add attribute in the database
      }
    })
  }
}
