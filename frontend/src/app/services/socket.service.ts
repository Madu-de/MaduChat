import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Websocket extends Socket {
  constructor(auth: AuthService) { 
    super({
      url: environment.wsURL,
      options: {
        extraHeaders: {
          ['authorization']: 'Bearer ' + auth.token
        }
      }
    });
    this.connect();
  }
}
