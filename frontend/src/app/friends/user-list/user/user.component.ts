import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/classes/User';

@Component({
  selector: 'user-list-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input()
  user: User | undefined;

  @Input()
  clientUser: User | undefined;

  isFriend: boolean = false;

  ngOnInit() {
    const friendRequestSent = this.clientUser?.friendRequestsSent?.some(user => user.id === this.user?.id);
    const isFriend = this.clientUser?.friends?.some(user => user.id === this.user?.id);
    this.isFriend = 
      friendRequestSent ||
      isFriend ||
      false;
  }
}
