import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureComponent } from './picture.component';
import { UserService } from 'src/app/services/user.service';
import { LanguageService } from 'src/app/services/language.service';
import { MatIconModule } from '@angular/material/icon';

describe('PictureComponent', () => {
  let component: PictureComponent;
  let fixture: ComponentFixture<PictureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule
      ],
      declarations: [PictureComponent],
      providers: [
        {
          provide: UserService,
          useValue: {}
        },
        {
          provide: LanguageService,
          useValue: {
            getValue: () => ''
          }
        },
      ]
    });
    fixture = TestBed.createComponent(PictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
