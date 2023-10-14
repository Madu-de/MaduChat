import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/User';
import { AuthService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'header-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.scss']
})
export class ProfilePopupComponent implements OnInit {
  public user: User | undefined;

  constructor(public languageService: LanguageService, public auth: AuthService, public userService: UserService) {}
  
  ngOnInit() {
    this.userService.getMe().subscribe((user) => {
      this.user = user;
      this.userService.getUserProfilePicture(this.user.id).subscribe((image) => {
        if (!this.user) return;
        this.user.image = image;
      })
    });
  }
}
