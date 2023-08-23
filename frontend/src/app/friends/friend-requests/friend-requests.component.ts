import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/classes/User';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'friends-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.scss']
})
export class FriendRequestsComponent {
  @Input()
  user: User | undefined;

  constructor(public languageService: LanguageService) {}
}
