import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Message } from '../classes/Message';
import { User } from '../classes/User';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  public messages: Message[] = [
    new Message('Moin mein Name ist Madu', new User(23, 'madu', 'Madu', './assets/madu.png'))
  ];
  constructor(public languageService: LanguageService) {}
}
