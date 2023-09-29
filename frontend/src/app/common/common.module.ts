import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup/popup.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    PopupComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  exports: [
    PopupComponent
  ]
})
export class MaduChatCommonModule { }
