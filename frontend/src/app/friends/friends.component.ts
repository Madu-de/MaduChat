import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { UserService } from '../services/user.service';
import { User } from '../classes/User';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  user: User | undefined;
  activeIndex: number = 0;
  loading: boolean = true;

  constructor(
    public languageService: LanguageService, 
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {}

  ngOnInit() {
    this.reloadUser();
    this.changeToTabInQueryParams();
  }

  tabChanged(event: MatTabChangeEvent) {
    this.reloadUser();
    this.reloadQueryParamTo('tab', event.index);
  }

  reloadUser() {
    this.loading = true;
    this.userService.getMe(false, true, true).subscribe(user => {
      this.loading = false;
      this.user = user;
    });
  }

  reloadQueryParamTo(queryParamName: string, index: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { [queryParamName]: index },
      queryParamsHandling: 'merge',
    });
  }

  changeToTabInQueryParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.activeIndex = params['tab'] || 0;
    });
  }
}
