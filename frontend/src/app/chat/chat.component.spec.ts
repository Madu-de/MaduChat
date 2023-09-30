import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { LanguageService } from '../services/language.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

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
          provide: AuthService,
          useValue: {
            token: '',
          }
        },
        {
          provide: UserService,
          useValue: {
            
          }
        }
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
