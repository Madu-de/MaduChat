import { Component, ElementRef, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { UserService } from '../services/user.service';
import { User } from '../classes/User';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  loading: boolean = true;
  user: User | undefined;

  constructor(public languageService: LanguageService, public userService: UserService) {}

  ngOnInit() {
    this.userService.getMe(false, false, true).subscribe((user) => {
      this.user = user;
      this.loading = false;
    });
  }
}
