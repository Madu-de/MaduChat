import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseUsersPopupComponent } from './choose-users-popup.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { MatListModule } from '@angular/material/list';

describe('ChooseUsersPopupComponent', () => {
  let component: ChooseUsersPopupComponent;
  let fixture: ComponentFixture<ChooseUsersPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatListModule
      ],
      declarations: [ChooseUsersPopupComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            users: [],
            clientUser: {}
          }
        },
        {
          provide: UserService,
          useValue: {
            getMe: () => of({})
          }
        },
        {
          provide: LanguageService,
          useValue: {
            getValue: () => ''
          }
        },
      ]
    });
    fixture = TestBed.createComponent(ChooseUsersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
