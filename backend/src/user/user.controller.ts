import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from './user';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { BooleanPipe } from '../pipes/boolean/boolean.pipe';
import { Settings } from './settings';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUsersLike(
    @Query('like') name: string,
    @Query('friends', BooleanPipe) friends: boolean,
    @Query('chats', BooleanPipe) chats: boolean,
    @Query('settings', BooleanPipe) settings: boolean,
  ) {
    return await this.userService.getUserLike(name, friends, chats, settings);
  }

  @UseGuards(AuthGuard)
  @Get([':id', 'me'])
  async getUser(
    @Param('id') id: string,
    @Query('friends', BooleanPipe) friends: boolean,
    @Query('chats', BooleanPipe) chats: boolean,
    @Query('settings', BooleanPipe) settings: boolean,
    @Req() request: Request,
  ): Promise<User> {
    if (id === 'me') id = request['user'].id;
    return await this.userService.getUser(id, friends, chats, settings);
  }

  @UseGuards(AuthGuard)
  @Post('me/settings')
  async changeSettings(
    @Body() settings: Settings,
    @Req() request: Request,
  ): Promise<Settings> {
    return (await this.userService.changeSettings(request['user'].id, settings))
      .settings;
  }

  @UseGuards(AuthGuard)
  @Post('me/settings/:key')
  async changeSetting(
    @Param('key') key: string,
    @Body('value') value: any,
    @Req() request: Request,
  ): Promise<Settings> {
    return (
      await this.userService.changeSetting(request['user'].id, key, value)
    ).settings;
  }
}
