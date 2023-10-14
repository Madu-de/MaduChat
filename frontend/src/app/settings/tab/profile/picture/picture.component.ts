import { Component, Input } from '@angular/core';
import { User } from 'src/app/classes/User';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'settings-profile-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent {
  @Input()
  user: User | undefined;

  constructor(private userService: UserService, public languageService: LanguageService) {}

  changeProfilePictureTo(file: File | undefined) {
    if (!file) return;
    this.userService.setUserProfilePicture(file).subscribe((image) => {
      if (!this.user) return;
      this.user.image = image;
    });
  }

  deleteProfilePicture() {
    this.userService.deleteUserProfilePicture().subscribe(() => {
      if (!this.user) return;
      this.user.image = '';
    });
  }
}
