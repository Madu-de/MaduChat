import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/classes/User';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private userService: UserService) { }

  ngOnInit() {
    const friendRequestSent = this.clientUser?.friendRequestsSent?.some(user => user.id === this.user?.id);
    const isFriend = this.clientUser?.friends?.some(user => user.id === this.user?.id);
    this.isFriend = friendRequestSent || isFriend || false;
  }

  toggleFriendStatus() {
    if (this.isFriend) {
      this.userService.removeFriend(<string>this.user?.id).subscribe(user => {
        this.user = user;
      });
    } else {
      this.userService.addFriend(<string>this.user?.id).subscribe(user => {
        this.user = user;
      });
    }
    this.isFriend = !this.isFriend;
  }
}
