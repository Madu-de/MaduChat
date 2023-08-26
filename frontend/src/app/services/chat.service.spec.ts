import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { HttpClient } from '@angular/common/http';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {}
        }
      ]
    });
    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
