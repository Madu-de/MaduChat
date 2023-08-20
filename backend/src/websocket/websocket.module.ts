import { Global, Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';

@Global()
@Module({
  providers: [WebsocketService, WebsocketGateway],
  exports: [WebsocketService],
})
export class WebsocketModule {}
