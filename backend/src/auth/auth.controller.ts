import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    const token = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return token;
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() user: User) {
    const oldUser = { ...user };
    await this.userService.createUser(user);
    const token = await this.authService.signIn(
      oldUser.username,
      oldUser.password,
    );
    return token;
  }
}
