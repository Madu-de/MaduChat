import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionComponent } from './option/option.component';
import { SettingsComponent } from './settings.component';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileComponent } from './tab/profile/profile.component';
import { GeneralComponent } from './tab/general/general.component';
import { TabComponent } from './tab/tab.component';
import { MatCardModule } from '@angular/material/card';
import { CategoryComponent } from './tab/category/category.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PictureComponent } from './tab/profile/picture/picture.component';


@NgModule({
  declarations: [
    SettingsComponent,
    OptionComponent,
    ProfileComponent,
    GeneralComponent,
    TabComponent,
    CategoryComponent,
    PictureComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SettingsModule { }
