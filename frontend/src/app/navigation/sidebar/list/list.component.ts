import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/classes/Chat';
import { ChatService } from 'src/app/services/chat.service';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sidebar-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  chats: Chat[] = [];

  constructor(public language: LanguageService, private userService: UserService, private chatService: ChatService) {}

  ngOnInit() {
    this.userService.getMe(true).subscribe(user => {
      this.chats = (<Chat[]>user.chats).filter(chat => chat.id !== 'global');
      this.chats.forEach((chat, i) => {
        this.chatService.get(chat.id, true).subscribe(chat => {
          this.chats[i] = chat;
        });
      });
    });
  }
}
