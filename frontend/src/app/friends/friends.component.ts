import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { UserService } from '../services/user.service';
import { User } from '../classes/User';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  user: User | undefined;

  constructor(public languageService: LanguageService, private userService: UserService) {}

  ngOnInit() {
    this.userService.getMe(false, true).subscribe(user => {
      this.user = user;
    });
  }
}
