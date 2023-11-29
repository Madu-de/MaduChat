import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/classes/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-choose-users-popup',
  templateUrl: './choose-users-popup.component.html',
  styleUrls: ['./choose-users-popup.component.scss']
})
export class ChooseUsersPopupComponent implements OnInit {
  choosedUsers: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChooseUsersPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { users: User[], clientUser: User },
    public userService: UserService,
  ) {}

  ngOnInit() {
    if (this.data.clientUser) return;
    this.userService.getMe(false, false, true).subscribe(user => {
      this.data.clientUser = user;
    });
  }

  toggleUserInList(user: User) {
    if (this.choosedUsers.some((choosedUser) => choosedUser.id === user.id)) {
      this.choosedUsers = this.choosedUsers.filter((choosedUser) => choosedUser.id !== user.id);
    } else {
      this.choosedUsers.push(user);
    }
  }

  choose() {
    this.dialogRef.close(this.choosedUsers);
  }
}
