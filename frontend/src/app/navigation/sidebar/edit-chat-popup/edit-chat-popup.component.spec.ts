import { MockModule } from 'ng-mocks';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChatPopupComponent } from './edit-chat-popup.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChatService } from 'src/app/services/chat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';

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
        MatListModule,
        MatIconModule,
        BrowserAnimationsModule,
        MockModule(FormsModule),
        MatTooltipModule,
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
          useValue: {
            get: () => of({})
          }
        },
        {
          provide: LanguageService,
          useValue: {
            getValue: () => ''
          }
        },
        {
          provide: UserService,
          useValue: {
            getMe: () => of({})
          }
        },
        {
          provide: SnackbarService,
          useValue: {}
        },
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
