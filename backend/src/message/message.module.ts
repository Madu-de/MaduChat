import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message';
import { Chat } from '../chat/chat';
import { User } from '../user/user';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat, User])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
