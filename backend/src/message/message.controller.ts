import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Message } from './message';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get(':id')
  async getMessage(id: string): Promise<Message> {
    return await this.messageService.getMessage(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createMessage(
    @Body('message') message: string,
    @Body('chatid') chatid: string,
    @Req() request: Request,
  ): Promise<Message> {
    console.log(message);
    return await this.messageService.createMessage(
      message,
      chatid,
      request['user'].id,
    );
  }
}
