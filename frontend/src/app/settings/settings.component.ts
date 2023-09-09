import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  constructor(public languageService: LanguageService, public userService: UserService) {}
}
