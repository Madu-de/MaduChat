import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  urlPosition: string = '';

  constructor(public language: LanguageService, private userService: UserService, private chatService: ChatService, private router: Router) {}

  ngOnInit() {
    this.updateSidebar();
    this.userService.getMeChangedEmitter().subscribe(() => {
      this.updateSidebar();
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
}
