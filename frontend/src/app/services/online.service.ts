import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineService implements OnDestroy {
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];

  constructor(private snackbar: SnackbarService, private languageService: LanguageService) {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(() => {
      this.snackbar.open(this.languageService.getValue('youAreOnline'));
    }));
    
    this.subscriptions.push(this.offlineEvent.subscribe(() => {
      this.snackbar.open(this.languageService.getValue('youAreoffline'));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
