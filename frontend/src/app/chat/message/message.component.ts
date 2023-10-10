import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/classes/Message';
import { Settings } from 'src/app/classes/Settings';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'chat-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input()
  message: Message | undefined;
  
  @Input()
  settings: Settings | undefined;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserProfilePicture(this.message?.author?.id || '', (image => {
      if (!this.message) return;
      if (!this.message.author) return;
      this.message.author.image = <string>image;
    }));
  }
}
