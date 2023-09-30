import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/app/classes/Chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-edit-chat-popup',
  templateUrl: './edit-chat-popup.component.html',
  styleUrls: ['./edit-chat-popup.component.scss']
})
export class EditChatPopupComponent {
  chat: FormGroup = new FormGroup({
    name: new FormControl(this.data.chat.name)
  });

  constructor(
    public dialogRef: MatDialogRef<EditChatPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { chat: Chat },
    private chatService: ChatService
  ) {}

  saveChat() {
    this.chatService.editChat(this.data.chat.id, this.chat.value.name).subscribe((chat: Chat) => {
      this.dialogRef.close(chat);
    });
  }
}
