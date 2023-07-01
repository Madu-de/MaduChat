import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { NavigationService } from './services/navigation.service';
import { SidebarModule } from './sidebar/sidebar.module';


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarModule
  ],
  imports: [
    CommonModule,
    MatCommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    SidebarModule
  ],
  providers: [
    NavigationService
  ],
})
export class NavigationModule { }
