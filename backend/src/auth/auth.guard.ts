import { AuthService } from './auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request =
      context.switchToWs().getClient().handshake ||
      context.switchToHttp().getRequest();
    const isWebsocket = request.url.startsWith('/socket.io');
    const websocketId = isWebsocket ? context.switchToWs().getClient().id : 0;
    const token = this.authService.extractTokenFromHeader(
      request.headers['authorization'],
    );
    if (!token) {
      return this.authService.unauthorized(websocketId);
    }
    try {
      const payload = await this.authService.getPayloadFromToken(token);
      if (!payload) throw new Error('Token is invalid');
      request['user'] = payload;
    } catch {
      return this.authService.unauthorized(websocketId);
    }
    return true;
  }
}
