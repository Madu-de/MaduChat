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
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user/user';
import { InjectRepository } from '@nestjs/typeorm';

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

  constructor(
    private socketService: WebsocketService,
    private auth: AuthService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  afterInit(server: Server) {
    this.socketService.socket = server;
    this.logger.log(`Websocket initialized`);
  }

  async handleConnection(client: Socket) {
    this.setClientUserIsOnlineTo(client, true);
    this.logger.log(`${client.id} connected to websocket`);
  }

  handleDisconnect(client: Socket) {
    this.setClientUserIsOnlineTo(client, false);
    this.logger.log(`${client.id} disconnected to websocket`);
  }

  private async setClientUserIsOnlineTo(client: Socket, isOnline: boolean) {
    const user = await this.auth.getUserFromHeaderToken(
      client.handshake.headers['authorization'],
    );
    if (!user) return;
    user.isOnline = isOnline;
    this.userRepo.save(user);
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
