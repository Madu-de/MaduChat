import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChatPopupComponent } from './edit-chat-popup.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChatService } from 'src/app/services/chat.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageService } from 'src/app/services/language.service';

describe('EditChatPopupComponent', () => {
  let component: EditChatPopupComponent;
  let fixture: ComponentFixture<EditChatPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [EditChatPopupComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            chat: {
              name: ''
            },
          }
        },
        {
          provide: ChatService,
          useValue: {}
        },
        {
          provide: LanguageService,
          useValue: {
            getValue: () => ''
          }
        }
      ]
    });
    fixture = TestBed.createComponent(EditChatPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
