import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineService implements OnDestroy {
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];

  constructor(private snackbar: SnackbarService) {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(() => {
      this.snackbar.open(`Du bist wieder online!`, '');
    }));
    
    this.subscriptions.push(this.offlineEvent.subscribe(() => {
      this.snackbar.open(`Du bist offline!`, '');
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
