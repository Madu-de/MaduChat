import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/classes/User';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'friends-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.scss']
})
export class FindFriendsComponent implements OnChanges {
  @Input()
  user: User | undefined;

  users: User[] = [];

  searchValue: string = '';

  loading: boolean = false;

  searchForm: FormGroup = new FormGroup({
    searchbar: new FormControl(''),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] === undefined) return;
    if (changes['user'].previousValue === undefined) return;
    if (changes['user'].currentValue.friends.length !== changes['user'].previousValue.friends.length) this.search(this.searchValue);
    if (changes['user'].currentValue.friendRequestsSent.length !== changes['user'].previousValue.friendRequestsSent.length) this.search(this.searchValue);
  }

  constructor(private userService: UserService, public languageService: LanguageService) {}

  search(searchFor?: string) {
    this.loading = true;
    this.searchValue = searchFor || this.searchForm.value['searchbar'];
    this.userService.getUsersLike(this.searchValue).subscribe(users => {
      this.loading = false;
      this.users = users.filter(user => user.id !== this.user?.id);
    });
  }
}
