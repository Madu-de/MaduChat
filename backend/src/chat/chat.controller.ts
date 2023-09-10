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
import { Chat } from './chat';
import { ChatService } from './chat.service';
import { AuthGuard } from '../auth/auth.guard';
import { Message } from '../message/message';
import { BooleanPipe } from '../pipes/boolean/boolean.pipe';
import { ChatGuard } from '../websocket/chat/chat.guard';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(AuthGuard, ChatGuard)
  @Get(':id')
  async getChat(
    @Param('id') id: string,
    @Query('members', BooleanPipe) members: boolean,
  ): Promise<Chat> {
    return await this.chatService.getChat(id, members);
  }

  @UseGuards(AuthGuard, ChatGuard)
  @Get(':id/messages')
  async getChatMessages(@Param('id') id: string): Promise<Message[]> {
    return await this.chatService.getChatMessages(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createChat(
    @Req() request: Request,
    @Body('memberids') memberids: string[],
  ): Promise<Chat> {
    memberids.push(request['user'].id);
    return await this.chatService.createChat(memberids);
  }
}
