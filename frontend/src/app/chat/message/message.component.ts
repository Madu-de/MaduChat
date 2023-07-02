import { Component, Input } from '@angular/core';
import { Message } from 'src/app/classes/Message';

@Component({
  selector: 'chat-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input()
  message: Message | undefined;
}
