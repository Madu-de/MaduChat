import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from 'src/app/services/user.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { LanguageService } from 'src/app/services/language.service';
import { MockBadgeListComponent } from 'src/app/user/badge-list/mock-badge-list.component';

describe('UserComponent /friends (user-list)', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

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
        RouterTestingModule
      ],
      declarations: [UserComponent, MockBadgeListComponent],
      providers: [
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: SnackbarService,
          useValue: {},
        },
        {
          provide: LanguageService,
          useValue: {},
        }
      ],
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
