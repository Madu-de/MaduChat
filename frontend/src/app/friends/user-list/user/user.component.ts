import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/classes/User';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { LanguageService } from 'src/app/services/language.service';


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

  @Input()
  isAdded: boolean = false;

  @Output()
  onToggle: EventEmitter<boolean> = new EventEmitter();

  userImage: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (!this.user) return;
    this.userService.getUserProfilePicture(this.user.id).subscribe((image) => {
      this.userImage = image;
    });
  }
}
