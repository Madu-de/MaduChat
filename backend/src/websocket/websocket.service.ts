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
    // We cannot check every user in the chat individually. Therefore, we delete it for every member the first time
    delete message.author.isOnline;
    this.socket.to(chatid).emit('message', message);
  }
}
