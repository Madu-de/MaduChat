import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Message } from '../classes/Message';
import { User } from '../classes/User';
import { ActivatedRoute } from '@angular/router';
import { Chat } from '../classes/Chat';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public messages: Message[] = [];

  private chat: Chat | undefined;

  constructor(public languageService: LanguageService, private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit() {
    const chatId = this.route.snapshot.paramMap.get('id');
    if (!chatId) return;
    this.chatService.get(chatId).subscribe((chat) => {
      this.chat = chat;
      console.log(this.chat);
    });
    this.chatService.getMessages(chatId).subscribe((messages) => {
      this.messages = messages;
      console.log(this.messages);
    });
    this.languageService.getValue('general');
  }

  sendMessage(message: string) {

  }
}
