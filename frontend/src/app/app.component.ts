import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthService, private scrollService: ScrollService) {}

  ngAfterViewInit() {
    document.querySelectorAll('mat-drawer-content')[0].addEventListener('scroll', () => {
      this.scrollService.onScroll.emit();
    });
  }

  isLoggedIn() {
    return this.auth.token != '';
  }
}
