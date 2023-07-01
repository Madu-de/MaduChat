import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'navigation-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {  
  constructor(public navigation: NavigationService) {}

  ngOnInit() {
    
  }
}
