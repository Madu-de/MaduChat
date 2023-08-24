import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/classes/Message';
import { Settings } from 'src/app/classes/Settings';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'chat-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input()
  message: Message | undefined;

  constructor(public userService: UserService) {}

  settings: Settings | undefined;

  ngOnInit() {
    this.userService.getMe(false, false, true).subscribe(user => {
      this.settings = user.settings;
    }); 
  }
}
