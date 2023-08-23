import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from '../user.service';

@Controller('friends')
export class FriendsController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post()
  async addFriendRequest(
    @Body('friendId') id: string,
    @Req() request: Request,
  ) {
    return this.userService.addFriendRequest(request['user'].id, id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async removeFriend(@Body('friendId') id: string, @Req() request: Request) {
    return this.userService.removeFriend(request['user'].id, id);
  }
}
