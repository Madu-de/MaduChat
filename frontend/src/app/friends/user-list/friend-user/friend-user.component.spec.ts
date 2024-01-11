import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendUserComponent } from './friend-user.component';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { LanguageService } from 'src/app/services/language.service';
import { MockModule } from 'ng-mocks';
import { BasicNeedsModule } from 'src/app/basic-needs/basic-needs.module';

describe('FriendUserComponent', () => {
  let component: FriendUserComponent;
  let fixture: ComponentFixture<FriendUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(BasicNeedsModule)
      ],
      declarations: [FriendUserComponent],
      providers: [
        {
          provide: UserService,
          useValue: {}
        },
        {
          provide: SnackbarService,
          useValue: {}
        },
        {
          provide: LanguageService,
          useValue: {}
        },
      ]
    });
    fixture = TestBed.createComponent(FriendUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
