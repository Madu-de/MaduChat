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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(
    @Param('id') id: string,
    @Query('friends', BooleanPipe) friends: boolean,
    @Query('chats', BooleanPipe) chats: boolean,
    @Query('settings', BooleanPipe) settings: boolean,
  ): Promise<User> {
    return await this.userService.getUser(id, friends, chats, settings);
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return await this.userService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Post('addFriend')
  async addFriend(@Body('friendId') id: string, @Req() request: Request) {
    this.userService.addFriend(request['user'].id, id);
  }
}
