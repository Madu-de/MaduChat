import { AuthService } from './auth.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request =
      context.switchToWs().getClient().handshake ||
      context.switchToHttp().getRequest();
    const isWebsocket = request.url.startsWith('/socket.io');
    const websocketId = isWebsocket
      ? context.switchToHttp().getRequest().id
      : 0;
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return this.authService.unauthorized(websocketId);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch {
      return this.authService.unauthorized(websocketId);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
