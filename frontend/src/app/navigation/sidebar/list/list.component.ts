import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chat } from 'src/app/classes/Chat';
import { User } from 'src/app/classes/User';
import { ChatService } from 'src/app/services/chat.service';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';
import { EditChatPopupComponent } from '../edit-chat-popup/edit-chat-popup.component';
import { DeleteChatPopupComponent } from "../delete-chat-popup/delete-chat-popup.component";

@Component({
  selector: 'sidebar-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  chats: Chat[] = [];
  urlPosition: string = '';
  user: User | undefined;

  constructor(public language: LanguageService, private userService: UserService, private chatService: ChatService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.updateSidebar();
    this.userService.getMeChangedEmitter().subscribe(() => {
      this.updateSidebar();
    });
    this.userService.getMe().subscribe((me) => {
      this.user = me;
    });
    this.router.events.subscribe(event => {
      if (event.type !== 1) return;
      event.url = event.url.split('?')[0];
      this.urlPosition = event.url;
    });
  }

  updateSidebar() {
    this.userService.getMe(true).subscribe(user => {
      this.chats = (<Chat[]>user.chats).filter(chat => chat.id !== 'global');
      this.chats.forEach((chat, i) => {
        this.chatService.get(chat.id, true).subscribe(chat => {
          this.chats[i] = chat;
        });
      });
    });
  }

  openEditMenu(chat: Chat) {
    this.dialog.open(EditChatPopupComponent, {
      data: { chat }
    }).afterClosed().subscribe((chat?: Chat) => {
      if (!chat) return;
      const indexOfChat = this.chats.findIndex(searchChat => chat.id === searchChat.id);
      this.chats[indexOfChat] = chat;
    });
  }

  openDeleteMenu(chat: Chat) {
    this.dialog.open(DeleteChatPopupComponent, { data: { chat }}).afterClosed().subscribe(
      deletedResult => {
          if (deletedResult > 0) {
            this.updateSidebar();
          }
      }
    )
  }

  clientIsAdminOfChat(chat: Chat): boolean {
    return chat.admins?.find(admin => admin.id === this.user?.id) !== undefined;
  }
}
