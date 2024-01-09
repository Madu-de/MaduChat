import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../message/message.service';
import { Message } from 'src/message/message';

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

  forceUserLeave(chatid: string, userid: string) {
    const clients = this.socket.sockets.sockets;
    clients.forEach(client => {
      if (!client.rooms.has(chatid)) return;
      if (client.handshake['user'].id !== userid) return;
      client.leave(chatid);
      client.emit('kickedFromChat');
    });
  }

  async sendMessage(client: Socket, msg: string) {
    let chatid: string;
    client.rooms.forEach(room => {
      if (room === client.id) return;
      chatid = room;
    });
    if (!chatid) return false;
    const userid = client.handshake['user'].id;
    let message: Message;
    try {
      message = await this.messageService.createMessage(msg, chatid, userid);
    } catch (err: unknown) {
      this.throwWebsocketAndAPIError(
        +client.id,
        (<HttpException>err).message,
        HttpStatus.BAD_REQUEST,
      );
      return;
    }
    // We cannot check every user in the chat individually. Therefore, we delete it for every member the first time
    delete message.author.isOnline;
    this.socket.to(chatid).emit('message', message);
  }

  // errors
  throwWebsocketAndAPIError(
    websocketId: number | undefined,
    msg: string,
    status: HttpStatus,
  ) {
    if (websocketId !== 0) {
      this.socket.in(websocketId.toString()).emit('error', msg);
    } else {
      throw new HttpException(msg, status);
    }
  }
}
