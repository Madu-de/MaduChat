import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChatService } from 'src/app/services/chat.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageService } from 'src/app/services/language.service';
import { DeleteChatPopupComponent } from "./delete-chat-popup.component";

describe('DeleteChatPopupComponent', () => {
  let component: DeleteChatPopupComponent;
  let fixture: ComponentFixture<DeleteChatPopupComponent>;

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
      declarations: [DeleteChatPopupComponent],
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
    fixture = TestBed.createComponent(DeleteChatPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
