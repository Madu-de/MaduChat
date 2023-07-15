import {
  Body,
  Controller,
  Get,
  Post,
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

  @UseGuards()
  @Get(':id')
  async getMessage(
    id: string,
    @Query('author', BooleanPipe) author: boolean,
    @Query('chat', BooleanPipe) chat: boolean,
  ): Promise<Message> {
    return await this.messageService.getMessage(id, author, chat);
  }

  @UseGuards(AuthGuard)
  @Post(':chatid')
  async createMessage(
    chatid: string,
    @Body('message') message: string,
    @Req() request: Request,
  ): Promise<Message> {
    return await this.messageService.createMessage(
      message,
      chatid,
      request['user'].id,
    );
  }
}
