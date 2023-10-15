import { Component, Input } from '@angular/core';
import { User } from 'src/app/classes/User';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'settings-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input()
  user: User | undefined;

  constructor(public languageService: LanguageService) {}
}
