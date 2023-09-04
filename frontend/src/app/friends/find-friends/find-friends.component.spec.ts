import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFriendsComponent } from './find-friends.component';
import { UserService } from 'src/app/services/user.service';
import { LanguageService } from 'src/app/services/language.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MockUserListComponent } from '../user-list/mockuser-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FindFriendsComponent', () => {
  let component: FindFriendsComponent;
  let fixture: ComponentFixture<FindFriendsComponent>;

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
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatProgressBarModule,
      ],
      declarations: [FindFriendsComponent, MockUserListComponent],
      providers: [
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: LanguageService,
          useValue: {
            getValue: () => ''
          },
        }
      ],
    });
    fixture = TestBed.createComponent(FindFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
