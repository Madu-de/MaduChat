import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Settings } from './settings';
import { Chat } from '../chat/chat';
import { FriendsController } from './friends/friends.controller';
import { ReviewController } from './review/review.controller';
import { Review } from './review/review';
import { ReviewService } from './review/review.service';
import { ReviewStats } from './review/reviewStats';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Settings, Chat, Review, ReviewStats]),
  ],
  providers: [UserService, ReviewService],
  controllers: [UserController, FriendsController, ReviewController],
  exports: [UserService],
})
export class UserModule {}
