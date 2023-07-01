import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'navigation-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer', {static: true}) input: MatSidenav | undefined;
  
  constructor(public navigation: NavigationService) { }

  ngOnInit() {
    if (this.input == undefined) return;
    this.input.open();
    this.navigation.setSidebar(this.input);
  }
}
