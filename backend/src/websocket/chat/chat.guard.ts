import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const wsContext = context.switchToWs();
    const chatid: string | undefined = wsContext.getData().chatid;
    if (!chatid) this.authService.notAllowed(wsContext.getClient().id);
    const userid = wsContext.getClient().handshake.user.id;
    if (!userid) this.authService.notAllowed(wsContext.getClient().id);
    const user = await this.userService.getUser(userid, false, true);
    const isAbleToJoin = user.chats.some(chat => chat.id === chatid);
    if (!isAbleToJoin)
      return this.authService.notAllowed(wsContext.getClient().id);
    return true;
  }
}
