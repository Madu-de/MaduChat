import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Chat } from './chat';
import { ChatService } from './chat.service';
import { AuthGuard } from '../auth/auth.guard';
import { Message } from '../message/message';
import { BooleanPipe } from '../pipes/boolean/boolean.pipe';
import { ChatGuard } from 'src/websocket/chat/chat.guard';

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
}
