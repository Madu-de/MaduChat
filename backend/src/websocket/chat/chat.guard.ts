import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class ChatGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request =
      context.switchToWs().getClient().handshake ||
      context.switchToHttp().getRequest();
    const isWebsocket = request.url.startsWith('/socket.io');
    const websocketId = isWebsocket ? context.switchToWs().getClient().id : 0;

    const wsContext = isWebsocket ? context.switchToWs() : undefined;
    const chatid: string | undefined =
      wsContext?.getData().chatid || request.params.id;
    if (!chatid) return this.authService.notAllowed(websocketId);
    const userid =
      wsContext?.getClient().handshake.user.id || request['user'].id;
    if (!userid) return this.authService.notAllowed(websocketId);
    const user = await this.userService.getUser(userid, false, true);
    const isAbleToJoin = user.chats.some(chat => chat.id === chatid);
    if (!isAbleToJoin) return this.authService.notAllowed(websocketId);
    return true;
  }
}
