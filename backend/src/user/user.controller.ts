import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { BooleanPipe } from '../pipes/boolean/boolean.pipe';
import { Settings } from './settings';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { SharpPipe } from './sharp.pipe';

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
  @Put('me/settings')
  async changeSettings(
    @Body() settings: Settings,
    @Req() request: Request,
  ): Promise<Settings> {
    return (await this.userService.changeSettings(request['user'].id, settings))
      .settings;
  }

  @UseGuards(AuthGuard)
  @Put('me/profilepicture')
  @UseInterceptors(FileInterceptor('file'))
  async changeProfilePicture(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
      SharpPipe,
    )
    filePath: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return await this.userService.changeProfilePicture(
      request['user'].id,
      filePath,
      response,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id/profilepicture')
  async getProfilePicture(@Param('id') id: string, @Res() response: Response) {
    return await this.userService.getProfilePicture(id, response);
  }

  @UseGuards(AuthGuard)
  @Delete('/me/profilepicture')
  async deleteProfilePicture(@Req() request: Request) {
    return await this.userService.deleteProfilePicture(request['user'].id);
  }
}
