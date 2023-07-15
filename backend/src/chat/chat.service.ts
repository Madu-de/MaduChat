import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat';
import { Repository } from 'typeorm';
import { Message } from '../message/message';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
  ) {}

  async getChat(id: string, members?: boolean): Promise<Chat> {
    return await this.chatRepo.findOne({
      where: { id },
      relations: { members },
    });
  }

  async getChatMessages(id: string): Promise<Message[]> {
    const chat = await this.chatRepo.findOne({ where: { id } });
    const message = await this.messageRepo.find({
      where: { chat },
      relations: { author: true, chat: true },
    });
    return message;
  }
}
