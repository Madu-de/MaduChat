import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { LanguageService } from 'src/app/services/language.service';
import { OnlineService } from 'src/app/services/online.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'navigation-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {  
  showPopUp = false;
  isOnline: boolean = true;
  environment = environment;

  constructor(public navigation: NavigationService, public languageService: LanguageService, public onlineService: OnlineService) {}

  ngOnInit(): void {
    this.onlineService.subscriptions.push(
      this.onlineService.onlineEvent.subscribe(() => {
        this.isOnline = true; 
      }),
      this.onlineService.offlineEvent.subscribe(() => {
        this.isOnline = false;
      })
    )
  }

  togglePopup() {
    this.showPopUp = !this.showPopUp;
  }
}
