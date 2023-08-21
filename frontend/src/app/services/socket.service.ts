import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class Websocket extends Socket {
  constructor(auth: AuthService) { 
    super({
      url: 'ws://localhost:3001',
      options: {
        extraHeaders: {
          ['authorization']: 'Bearer ' + auth.token
        }
      }
    });
    this.connect();
  }
}
