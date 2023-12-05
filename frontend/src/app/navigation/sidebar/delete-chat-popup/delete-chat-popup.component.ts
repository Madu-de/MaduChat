import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/app/classes/Chat';
import { ChatService } from 'src/app/services/chat.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-edit-chat-popup',
  templateUrl: './delete-chat-popup.component.html',
  styleUrls: ['./delete-chat-popup.component.scss']
})
export class DeleteChatPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteChatPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { chat: Chat },
    private chatService: ChatService,
    public languageService: LanguageService
  ) {}

  deleteChat() {
    this.chatService.deleteChat(this.data.chat.id).subscribe((result: boolean) => {
      this.dialogRef.close(result);
    });
  }
}
