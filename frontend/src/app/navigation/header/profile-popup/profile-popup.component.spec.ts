import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePopupComponent } from './profile-popup.component';
import { LanguageService } from 'src/app/services/language.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MatCardModule } from '@angular/material/card';

describe('ProfilePopupComponent', () => {
  let component: ProfilePopupComponent;
  let fixture: ComponentFixture<ProfilePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
      ],
      declarations: [ProfilePopupComponent],
      providers: [
        {
          provide: LanguageService,
          useValue: {
            getValue: () => ''
          }
        },
        {
          provide: AuthService,
          useValue: {}
        },
        {
          provide: UserService,
          useValue: {
            getMe: () => of({})
          }
        }
      ]
    });
    fixture = TestBed.createComponent(ProfilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
