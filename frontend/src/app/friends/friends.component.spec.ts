import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsComponent } from './friends.component';
import { LanguageService } from '../services/language.service';
import { UserService } from '../services/user.service';

import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MockFindFriendsComponent } from './find-friends/mockfind-friends.component';
import { MockFriendsListComponent } from './friends-list/mockfriends-list.component';
import { MockFriendRequestsComponent } from './friend-requests/mockfriend-requests.component';
import { MockUserListComponent } from './user-list/mockuser-list.component';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatListModule,
        MatDividerModule,
        MatButtonModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      declarations: [
        FriendsComponent,
        MockFindFriendsComponent,
        MockFriendsListComponent,
        MockFriendRequestsComponent,
        MockUserListComponent
      ],
      providers: [
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
      ]
    });
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
