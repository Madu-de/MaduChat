import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../classes/User';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from '../services/snackbar.service';
import { catchError, throwError } from 'rxjs';

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

  constructor(public userService: UserService, private route: ActivatedRoute, private snackbar: SnackbarService, private router: Router) {}

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
        console.log(this.isFriend);
      })
    });
  }
}
