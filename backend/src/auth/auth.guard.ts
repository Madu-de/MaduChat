import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { WebsocketService } from 'src/websocket/websocket.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private websocketService: WebsocketService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request =
      context.switchToHttp().getRequest()?.handshake ||
      context.switchToHttp().getRequest();
    const isWebsocket = request.url.startsWith('/socket.io');
    const websocketId = isWebsocket
      ? context.switchToHttp().getRequest().id
      : 0;
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return this.unauthorized(websocketId);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch {
      return this.unauthorized(websocketId);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private unauthorized(websocketId: number) {
    if (websocketId !== 0) {
      this.websocketService.socket
        .in(websocketId.toString())
        .emit('error', 'Unauthorized');
      return false;
    } else {
      throw new UnauthorizedException();
    }
  }
}
