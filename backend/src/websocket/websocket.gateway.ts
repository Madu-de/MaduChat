import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { WebsocketService } from './websocket.service';
import { ChatGuard } from './chat/chat.guard';

@WebSocketGateway(3001, {
  transports: ['polling', 'websocket'],
  cors: ['**'],
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(WebsocketGateway.name);

  constructor(private socketService: WebsocketService) {}

  afterInit(server: Server) {
    this.socketService.socket = server;
    this.logger.log(`Websocket initialized`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`${client.id} connected to websocket`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`${client.id} disconnected to websocket`);
  }

  @UseGuards(AuthGuard, ChatGuard)
  @SubscribeMessage('joinChat')
  joinChat(
    @MessageBody() data: { chatid: string },
    @ConnectedSocket() client: Socket,
  ): boolean {
    this.logger.log(`${client.id} joined to ${data.chatid}`);
    this.socketService.joinChat(client, data.chatid);
    return true;
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('sendMessage')
  sendMessage(
    @MessageBody() data: { message: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(`${client.id} send a message`);
    if (!data.message) return false;
    this.socketService.sendMessage(client, data.message);
  }
}
