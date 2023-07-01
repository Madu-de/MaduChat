import { Injectable } from '@angular/core';
import { NavigationModule } from '../navigation.module';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private sidenav: MatSidenav | undefined;

  public setSidebar(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public toggleSidebar() {
    this.sidenav?.toggle();
  }
}
