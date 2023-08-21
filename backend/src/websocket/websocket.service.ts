import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { User } from 'src/user/user';

@Injectable()
export class WebsocketService {
  socket: Server = null;

  joinChat(client: Socket, user: User, chatid: string) {
    client.rooms.forEach(room => {
      if (room === client.id) return;
      client.leave(room);
    });
    client.join(chatid);
  }
}
