import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/classes/User';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar.service';


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

  constructor(private userService: UserService, private snackbar: SnackbarService) { }

  ngOnInit() {
    const friendRequestSent = this.clientUser?.friendRequestsSent?.some(user => user.id === this.user?.id);
    const isFriend = this.clientUser?.friends?.some(user => user.id === this.user?.id);
    this.isFriend = friendRequestSent || isFriend || false;
  }

  toggleFriendStatus() {
    let snackRef: MatSnackBarRef<TextOnlySnackBar>;
    if (this.isFriend) {
      snackRef = this.snackbar.open(`You removed @${this.user?.username} as your friend.`, `Undo`);
      this.userService.removeFriend(<string>this.user?.id).subscribe(user => {
        this.user = user;
      });
    } else {
      snackRef = this.snackbar.open(`You added @${this.user?.username} as your friend.`, `Undo`);
      this.userService.addFriend(<string>this.user?.id).subscribe(user => {
        this.user = user;
      });
    }
    snackRef?.onAction().subscribe(() => {
      this.toggleFriendStatus();
    });
    this.isFriend = !this.isFriend;
  }
}
