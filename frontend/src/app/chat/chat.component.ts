import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Message } from '../classes/Message';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Subscription, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Settings } from '../classes/Settings';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public messages: Message[] = [];
  public routerSubscription: Subscription | undefined;
  public channelExists: boolean = true;
  public loading: boolean = true;
  public settings: Settings | undefined;

  constructor(
    public languageService: LanguageService,
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private auth: AuthService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.userService.getMe(false, false, true).subscribe(user => {
      this.settings = user.settings;
    });
    this.routerSubscription = this.router.events.subscribe(val => {
      if (val.type !== 15) return;
      this.auth.websocket?.removeAllListeners();
      this.channelExists = true;
      const chatId = this.route.snapshot.paramMap.get('id');
      if (!chatId) return;
      this.auth.websocket?.on('error', (err: string) => {
        this.channelExists = false;
        console.log(err);
      });
      this.auth.websocket?.emit('joinChat', { chatid: chatId });
      this.chatService.getMessages(chatId)
        .pipe(
          catchError((err) => {
            this.loading = false;
            return throwError(() => new Error(err.error.message));
          })
        )
        .subscribe(messages => {
          this.loading = false;
          this.messages = messages;
          this.messages.sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1);
        });
      this.auth.websocket?.on('message', (message: Message) => {
        this.messages.unshift(message);
      });
    });
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
    this.auth.websocket?.removeAllListeners();
  }

  submitMessageInput(messageElement: HTMLInputElement) {
    this.auth.websocket?.emit('sendMessage', { message: messageElement.value });
    messageElement.value = '';
  }
}
