import { Global, Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user';
import { ChatService } from 'src/chat/chat.service';
import { MessageService } from 'src/message/message.service';
import { Chat } from 'src/chat/chat';
import { Message } from 'src/message/message';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Chat, Message])],
  providers: [WebsocketService, WebsocketGateway, ChatService, MessageService],
  exports: [WebsocketService],
})
export class WebsocketModule {}
