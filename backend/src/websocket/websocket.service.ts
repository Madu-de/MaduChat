import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../message/message.service';

@Injectable()
export class WebsocketService {
  socket: Server = null;

  constructor(private messageService: MessageService) {}

  joinChat(client: Socket, chatid: string) {
    client.rooms.forEach(room => {
      if (room === client.id) return;
      client.leave(room);
    });
    client.join(chatid);
  }

  async sendMessage(client: Socket, msg: string) {
    let chatid: string;
    client.rooms.forEach(room => {
      if (room === client.id) return;
      chatid = room;
    });
    if (!chatid) return false;
    const userid = client.handshake['user'].id;
    const message = await this.messageService.createMessage(
      msg,
      chatid,
      userid,
    );
    this.socket.to(chatid).emit('message', message);
  }
}
