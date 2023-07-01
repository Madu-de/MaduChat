import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MatCommonModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ListComponent } from './list/list.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    SidebarComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatCommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatCardModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
