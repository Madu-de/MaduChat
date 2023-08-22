import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navigation-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer', {static: true}) input: MatSidenav | undefined;
  routerSubscription: Subscription | undefined;

  constructor(public navigation: NavigationService, private router: Router) { }

  ngOnInit() {
    if (this.input == undefined) return;
    this.input.open();
    this.navigation.setSidebar(this.input);
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event.type !== 15) return;
      if (document.body.clientWidth > 600) return;
      this.input?.close();
    });
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }
}
