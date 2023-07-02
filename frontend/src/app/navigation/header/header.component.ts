import { Component } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'navigation-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {  
  showPopUp = false;
  constructor(public navigation: NavigationService, public languageService: LanguageService) {}

  togglePopup() {
    this.showPopUp = !this.showPopUp;
  }
}
