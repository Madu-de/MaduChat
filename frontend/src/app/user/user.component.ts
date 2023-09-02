import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../classes/User';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../services/snackbar.service';
import { catchError, throwError } from 'rxjs';
import { LanguageService } from '../services/language.service';
import { MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User | undefined;
  clientUser: User | undefined;
  loading: boolean = true;
  isFriend: boolean = false;
  isAdded: boolean = false;

  constructor(
    public userService: UserService, 
    private route: ActivatedRoute, 
    private snackbar: SnackbarService, 
    private router: Router, 
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    const userid = this.route.snapshot.paramMap.get('id') || '';
    this.userService.getMe(false, true).subscribe((clientUser) => {
      this.clientUser = clientUser;
      this.userService.getUser(userid, false, true)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.snackbar.open('User does not exist', '');
          this.router.navigate(['/']);
          return throwError(() => new Error(err.error.message));
        })
      )
      .subscribe((user) => {
        this.loading = false;
        this.user = user;
        this.isFriend = this.clientUser?.friends?.some((friend) => friend.id === this.user?.id) || false;
        this.isAdded = this.clientUser?.friendRequestsSent?.some((friend) => friend.id === this.user?.id) || false;
      })
    });
  }

  toggleFriendStatus() {
    if (this.user === undefined) return;
    let snackRef: MatSnackBarRef<TextOnlySnackBar>;
    if (this.isFriend || this.isAdded) {
      snackRef = this.snackbar.open(this.languageService.getValue('removedFriendMessage').replace('{username}', `@${this.user.username}`), this.languageService.getValue('undo'));
      this.userService.removeFriend(this.user.id).subscribe((friend) => {{
        this.isFriend = false;
        this.isAdded = false;
        this.user = friend;
      }});
    } else {
      snackRef = this.snackbar.open(this.languageService.getValue('addedFriendMessage').replace('{username}', `@${this.user.username}`), this.languageService.getValue('undo'));
      this.userService.addFriend(this.user.id).subscribe((friend) => {
        this.isAdded = true;
        this.isFriend = false;
        this.user = friend;
      });
    }
    snackRef.onAction().subscribe(() => {
      this.toggleFriendStatus();
    })
  }
}
