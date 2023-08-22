import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    if (!chat) throw new HttpException('No chat found', HttpStatus.BAD_REQUEST);
    const messages = await this.messageRepo.find({
      where: { chat },
      relations: { author: true, chat: true },
      order: {
        createdAt: {
          direction: 'DESC',
        },
      },
      take: 30,
    });
    return messages;
  }
}
