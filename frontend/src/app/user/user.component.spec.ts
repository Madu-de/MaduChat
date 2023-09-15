import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { LanguageService } from '../services/language.service';
import { Observable, of } from 'rxjs';
import { User } from '../classes/User';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatService } from '../services/chat.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBatchListComponent } from './batch-list/mock-batch-list.component';

describe('UserComponent /user', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        MatCardModule,
        MatDividerModule,
        MatTabsModule,
        MatButtonModule,
        MatProgressBarModule,
        MatIconModule,
        MatTooltipModule,
      ],
      declarations: [
        UserComponent, 
        MockBatchListComponent
      ],
      providers: [
        {
          provide: UserService,
          useValue: {
            getMe: (): Observable<User> => {
              return of(<User>{});
            },
            emitMeChanged: (): Observable<void> => {
              return of();
            }
          },
        },
        {
          provide: SnackbarService,
          useValue: {},
        },
        {
          provide: LanguageService,
          useValue: {
            getValue: () => '',
          },
        },
        {
          provide: ChatService,
          useValue: {}
        },
      ]
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
