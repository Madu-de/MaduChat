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
import { AuthGuard } from 'src/auth/auth.guard';
import { WebsocketService } from './websocket.service';

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

  @UseGuards(AuthGuard)
  @SubscribeMessage('joinChat')
  joinChat(
    @MessageBody() data: { chatid: string },
    @ConnectedSocket() client: Socket,
  ): boolean {
    // AUTHENTICATION HERE
    if (data.chatid === undefined) return false;
    client.join(`${data.chatid}`);
    this.logger.log(`${client.id} joined to ${data.chatid}`);
    return true;
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { message: string },
    @ConnectedSocket() client: Socket,
  ): string {
    // AUTHENTICATION HERE
    this.logger.log(`${client.id} send a message`);
    let room: string;
    client.rooms.forEach(rm => {
      if (rm === client.id) return;
      room = rm;
    });
    this.server.to(room).emit('message', data);
    return 'Hello world!';
  }
}
