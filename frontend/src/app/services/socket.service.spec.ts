import { TestBed } from '@angular/core/testing';

import { Websocket } from './socket.service';
import { AuthService } from './auth.service';

describe('Websocket', () => {
  let service: Websocket;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Websocket,
        {
          provide: AuthService,
          useValue: {
            token: ''
          }
        }
      ]
    });
    service = TestBed.inject(Websocket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
