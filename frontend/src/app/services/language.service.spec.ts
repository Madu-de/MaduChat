import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { of } from 'rxjs';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: {
            getMe: () => of({ settings: { language: 'Deutsch' } })
          },
        }
      ],
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
