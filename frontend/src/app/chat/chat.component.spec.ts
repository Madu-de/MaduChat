import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { LanguageService } from '../services/language.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Websocket } from '../services/socket.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatProgressBarModule,
      ],
      declarations: [ChatComponent],
      providers: [
        { 
          provide: LanguageService, 
          useValue: {
            getValue: () => '',
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        RouterTestingModule,
        {
          provide: ChatService,
          useValue: {}
        },
        {
          provide: Websocket,
          useValue: {
            removeAllListeners: () => {}
          }
        },
      ]
    });
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
