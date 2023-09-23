import { TestBed } from '@angular/core/testing';

import { OnlineService } from './online.service';
import { SnackbarService } from './snackbar.service';
import { LanguageService } from './language.service';

describe('OnlineService', () => {
  let service: OnlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SnackbarService,
          useValue: {}
        },
        {
          provide: LanguageService,
          useValue: {}
        }
      ]
    });
    service = TestBed.inject(OnlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
