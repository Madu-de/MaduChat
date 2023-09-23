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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProfilePopupComponent } from './header/profile-popup/profile-popup.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OutsideClickHideDirective } from './directives/outside-click-hide.directive';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [
    HeaderComponent,
    ProfilePopupComponent,
    OutsideClickHideDirective
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
    SidebarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  providers: [
    NavigationService
  ],
})
export class NavigationModule { }
