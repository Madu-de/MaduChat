import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat';
import { Message } from '../message/message';
import { User } from 'src/user/user';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message, User])],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
