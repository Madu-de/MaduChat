import { Global, Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [WebsocketService, WebsocketGateway],
  exports: [WebsocketService],
})
export class WebsocketModule {}
