import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Message } from './message';
import { MessageService } from './message.service';
import { AuthGuard } from '../auth/auth.guard';
import { BooleanPipe } from '../pipes/boolean/boolean.pipe';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async getMessage(
    id: string,
    @Query('author', BooleanPipe) author: boolean,
    @Query('chat', BooleanPipe) chat: boolean,
    @Req() request: Request,
  ): Promise<Message> {
    return await this.messageService.getMessage(
      id,
      request['user'],
      author,
      chat,
    );
  }

  @UseGuards(AuthGuard)
  @Post(':chatid')
  async createMessage(
    @Param('chatid') chatid: string,
    @Body('message') message: string,
    @Req() request: Request,
  ): Promise<Message> {
    return await this.messageService.createMessage(
      message,
      chatid,
      request['user'].id,
    );
  }
  @UseGuards(AuthGuard)
  @Put(':messageid')
  async editMessage(
    @Param('messageid') messageid: string,
    @Body('message') message: string,
    @Req() request: Request,
  ): Promise<boolean> {
    const result = this.messageService.editMessage(
      message,
      messageid,
      request['user'].id,
    );
    return result;
  }
}
