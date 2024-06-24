import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { ChooseUsersPopupComponent } from 'src/app/basic-needs/choose-users-popup/choose-users-popup.component';
import { Chat } from 'src/app/classes/Chat';
import { User } from 'src/app/classes/User';
import { ChatService } from 'src/app/services/chat.service';
import { LanguageService } from 'src/app/services/language.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-chat-popup',
  templateUrl: './edit-chat-popup.component.html',
  styleUrls: ['./edit-chat-popup.component.scss']
})
export class EditChatPopupComponent implements OnInit {

  chat: FormGroup = new FormGroup({
    name: new FormControl(this.data.chat.name, [
      Validators.minLength(1),
      Validators.maxLength(20),
      Validators.required
    ])
  });

  clientUser: User | undefined;

  members: User[] | undefined;

  constructor(
    public dialogRef: MatDialogRef<EditChatPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { chat: Chat },
    private chatService: ChatService,
    public languageService: LanguageService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.userService.getMe(false, false, true).subscribe((user) => {
      this.clientUser = user;
    });
    this.chatService.get(this.data.chat.id, true).subscribe((chat) => {
      this.members = chat.members;
    });
  }

  saveChat() {
    if (!this.members) return;
    this.chatService.editChat(this.data.chat.id, {
      id: this.data.chat.id,
      name: this.chat.controls['name'].value, 
      isPublic: this.data.chat.isPublic,
      isAdminChat: this.data.chat.isAdminChat,
      members: this.members
    }).pipe(
      catchError((error) => {
        if (error.error['message'] === 'You cannot kick admins') {
          this.snackbarService.open(this.languageService.getValue('youCannotKickAdmins'));
        }
        return throwError(() => error);
      }))
      .subscribe((chat) => {
        this.snackbarService.open(this.languageService.getValue('savedSuccessfully'));
        this.dialogRef.close(chat);
      });
  }

  openMembersAddMenu() {
    this.userService.getMe(false, true).subscribe((user) => {
      user.friends = user.friends?.filter((friend) => !this.members?.some((member) => member.id === friend.id));
      this.dialog.open(ChooseUsersPopupComponent, {
        data: {
          users: user.friends
        }
      }).afterClosed().subscribe((choosedUsers: User[] | undefined) => {
        if (!choosedUsers) return;
        this.members?.push(...choosedUsers);
      });
    });
  }

  removeUserFromChat(user: User) {
    this.members = this.members?.filter((member) => member.id !== user.id);
  }
}
