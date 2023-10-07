import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './user';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { BooleanPipe } from '../pipes/boolean/boolean.pipe';
import { Settings } from './settings';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './profilepictures/',
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const randomName = Array(20)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          const date = new Date();
          const time = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
          cb(null, `${randomName}-${time}${fileExtName}`);
        },
      }),
      // fileFilter: (req, file, cb) => {
      //   if (!file.mimetype.startsWith('image/')) {
      //     cb(
      //       new HttpException('File is not an image', HttpStatus.BAD_REQUEST),
      //       true,
      //     );
      //   }
      //   cb(null, true);
      // },
    }),
  )
  @UseGuards(AuthGuard)
  @Post('me/profilepicture')
  async changeProfilePicture(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.Multer.File,
    @Req() request: Request,
  ) {
    return await this.userService.changeProfilePicture(
      request['user'].id,
      file,
    );
  }
}
