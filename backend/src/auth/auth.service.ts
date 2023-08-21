import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as sha256 from 'sha256';
import { WebsocketService } from 'src/websocket/websocket.service';

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
      throw new UnauthorizedException('Password or Username wrong');
    }
    const payload = { id: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
      throw new UnauthorizedException();
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
