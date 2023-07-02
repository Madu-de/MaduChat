import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from './user';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.userService.getUser(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() user: User): Promise<User> {
    console.log(user);
    return await this.userService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Post('addFriend')
  async addFriend(@Body('friendId') id: string, @Req() request: Request) {
    this.userService.addFriend(request['user'].id, id);
  }
}
