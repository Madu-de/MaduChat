import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Message } from '../classes/Message';
import { ActivatedRoute } from '@angular/router';
import { Chat } from '../classes/Chat';
import { ChatService } from '../services/chat.service';
import { Websocket } from '../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public messages: Message[] = [];
  
  constructor(public languageService: LanguageService, private route: ActivatedRoute, private chatService: ChatService, private websocket: Websocket) {}

  ngOnInit() {
    const chatId = this.route.snapshot.paramMap.get('id');  
    if (!chatId) return;
    this.websocket.on('error', (err:string) => {
      console.log(err);
    });
    this.websocket.emit('joinChat', { chatid: chatId });
    this.chatService.getMessages(chatId).subscribe((messages) => {
      this.messages = messages;
      this.messages.sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1);
    });
    this.websocket.on('message', (message: Message) => {
      this.messages.unshift(message);
    });
    this.languageService.getValue('general');
  }

  ngOnDestroy(): void {
    this.websocket.removeAllListeners();
  }

  submitMessageInput(messageElement: HTMLInputElement) {
    this.websocket.emit('sendMessage', { message: messageElement.value });
    messageElement.value = '';
  }
}
