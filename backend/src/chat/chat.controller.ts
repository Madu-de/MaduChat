import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import { User } from 'src/user/user';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(AuthGuard, ChatGuard)
  @Get(':id')
  async getChat(
    @Param('id') id: string,
    @Query('members', BooleanPipe) members: boolean,
    @Req() request: Request,
  ): Promise<Chat> {
    return await this.chatService.getChat(id, request['user'], members);
  }

  @UseGuards(AuthGuard, ChatGuard)
  @Get(':id/messages')
  async getChatMessages(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<Message[]> {
    return await this.chatService.getChatMessages(id, request['user']);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createChat(
    @Req() request: Request,
    @Body('memberids') memberids: string[],
  ): Promise<Chat> {
    return await this.chatService.createChat(request['user'].id, memberids);
  }

  @UseGuards(AuthGuard, ChatGuard)
  @Put(':id')
  async updateChat(
    @Param('id') id: string,
    @Body('chat') chat: Chat,
    @Req() request: Request,
  ): Promise<Chat> {
    return await this.chatService.updateChat(id, chat, request['user']);
  }
}
