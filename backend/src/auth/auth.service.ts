import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as sha256 from 'sha256';
import { WebsocketService } from '../websocket/websocket.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private websocketService: WebsocketService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsernameWithPassword(
      username,
    );
    if (user?.password != sha256.x2(pass)) {
      throw new UnauthorizedException({
        message: 'Password or Username is wrong',
        errCode: 'passwordOrUsernameIsWrong',
        statusCode: 401,
      });
    }
    const payload = { id: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  extractTokenFromHeader(header: string): string | undefined {
    const [type, token] = header?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async getPayloadFromToken(
    token: string,
  ): Promise<{ id: string; username: string; iat: number; exp: number }> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
    } catch {
      return null;
    }
  }

  async getUserFromHeaderToken(header: string) {
    const token = this.extractTokenFromHeader(header);
    const payload = await this.getPayloadFromToken(token);
    return this.usersService.getUser(payload.id);
  }

  private errorIsFromWebsocket(websocketId: number): boolean {
    return websocketId !== 0;
  }

  unauthorized(websocketId: number) {
    if (this.errorIsFromWebsocket(websocketId)) {
      this.websocketService.socket
        .in(websocketId.toString())
        .emit('error', 'Unauthorized');
    } else {
      throw new UnauthorizedException({
        message: 'You are not authorized',
        errCode: 'unauthorized',
        statusCode: 401,
      });
    }
    return false;
  }

  notAllowed(websocketId: number) {
    if (this.errorIsFromWebsocket(websocketId)) {
      this.websocketService.socket
        .in(websocketId.toString())
        .emit('error', 'Not Allowed');
    } else {
      throw new HttpException('Not Allowed', HttpStatus.METHOD_NOT_ALLOWED);
    }
    return false;
  }
}
