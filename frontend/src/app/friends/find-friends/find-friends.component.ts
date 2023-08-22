import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/classes/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'friends-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.scss']
})
export class FindFriendsComponent {
  users: User[] = [];

  searchForm: FormGroup = new FormGroup({
    searchbar: new FormControl(''),
  });

  constructor(private userService: UserService) {}

  search() {
    const value = this.searchForm.value['searchbar'];
    this.userService.getUsersLike(value).subscribe(users => {
      this.users = users;
    });
  }
}
