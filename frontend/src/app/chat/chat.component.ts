import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Message } from '../classes/Message';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Websocket } from '../services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public messages: Message[] = [];
  public routerSubscription: Subscription | undefined;
  public channelExists: boolean = true;
  
  constructor(
    public languageService: LanguageService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private chatService: ChatService, 
    private websocket: Websocket
  ) {}

  ngOnInit() {
    this.languageService.getValue('general');
    this.routerSubscription = this.router.events.subscribe(val => {
      if (val.type !== 15) return;
      this.channelExists = true;
      this.websocket.removeAllListeners();
      const chatId = this.route.snapshot.paramMap.get('id');
      if (!chatId) return;
      this.websocket.on('error', (err:string) => {
        this.channelExists = false;
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
    });
  }
  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
    this.websocket.removeAllListeners();
  }

  submitMessageInput(messageElement: HTMLInputElement) {
    this.websocket.emit('sendMessage', { message: messageElement.value });
    messageElement.value = '';
  }
}
