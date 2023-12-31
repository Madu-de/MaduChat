import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Settings } from './settings';
import { Chat } from '../chat/chat';
import { FriendsController } from './friends/friends.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Settings, Chat])],
  providers: [UserService],
  controllers: [UserController, FriendsController],
  exports: [UserService],
})
export class UserModule {}
