import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

export class WebsocketConnection extends Socket {
  constructor(authtoken: string) { 
    super({
      url: environment.wsURL,
      options: {
        extraHeaders: {
          ['authorization']: 'Bearer ' + authtoken
        }
      }
    });
    this.connect();
  }
}
