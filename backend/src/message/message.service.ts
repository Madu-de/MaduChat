import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message';
import { Chat } from 'src/chat/chat';
import { User } from 'src/user/user';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getMessage(id: string): Promise<Message> {
    const message = await this.messageRepo.findOne({ where: { id } });
    return message;
  }

  async createMessage(
    message: string,
    chatid: string,
    authorid: string,
  ): Promise<Message> {
    const author = await this.userRepo.findOne({ where: { id: authorid } });
    const chat = await this.chatRepo.findOne({ where: { id: chatid } });
    if (!author) {
      throw new HttpException('Author does not exist', HttpStatus.BAD_REQUEST);
    }
    if (!chat) {
      throw new HttpException('Chat does not exist', HttpStatus.BAD_REQUEST);
    }
    const newMessage = this.messageRepo.save({
      message,
      chatid,
      authorid,
    });
    console.log('newMessage', newMessage);
    return newMessage;
  }
}
