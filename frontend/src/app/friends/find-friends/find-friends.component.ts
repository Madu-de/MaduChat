import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/classes/User';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'friends-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.scss']
})
export class FindFriendsComponent {
  @Input()
  user: User | undefined;

  users: User[] = [];

  searchForm: FormGroup = new FormGroup({
    searchbar: new FormControl(''),
  });

  constructor(private userService: UserService, public languageService: LanguageService) {}

  search() {
    const value = this.searchForm.value['searchbar'];
    this.userService.getUsersLike(value).subscribe(users => {
      this.users = users.filter(user => user.id !== this.user?.id);
    });
  }
}
