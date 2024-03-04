import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';
import { Message } from './message/message';
import { Chat } from './chat/chat';
import { Settings } from './user/settings';
import { WebsocketModule } from './websocket/websocket.module';
import 'dotenv/config';
import { Review } from './user/review/review';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +process.env.PORT || 3306,
      username: process.env.DATABASE_USERNAME || 'root',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE || 'maduchat',
      entities: [User, Message, Chat, Settings, Review],
      synchronize: true,
    }),
    UserModule,
    MessageModule,
    ChatModule,
    WebsocketModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
