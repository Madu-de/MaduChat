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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'maduchat',
      entities: [User, Message, Chat, Settings],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    MessageModule,
    ChatModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
