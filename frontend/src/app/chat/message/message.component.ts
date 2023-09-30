import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/classes/Message';
import { Settings } from 'src/app/classes/Settings';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'chat-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input()
  message: Message | undefined;
  
  @Input()
  settings: Settings | undefined;
}
