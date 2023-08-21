import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message';
import { Chat } from '../chat/chat';
import { User } from '../user/user';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getMessage(
    id: string,
    author?: boolean,
    chat?: boolean,
  ): Promise<Message> {
    const message = await this.messageRepo.findOne({
      where: { id },
      relations: { author, chat },
    });
    return message;
  }

  async createMessage(
    message: string,
    chatid: string,
    authorid: string,
  ): Promise<Message> {
    const author = await this.userRepo.findOne({ where: { id: authorid } });
    const chat = await this.chatRepo.findOne({
      where: { id: chatid },
      relations: { members: true },
    });
    if (!author) {
      throw new HttpException('Author does not exist', HttpStatus.BAD_REQUEST);
    }
    if (!chat) {
      throw new HttpException('Chat does not exist', HttpStatus.BAD_REQUEST);
    }
    if (!chat.members.find(member => member.id === author.id)) {
      throw new HttpException(
        'Author is not allowed to write a message in this chat',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.messageRepo.save({
      message,
      chat,
      author,
    });
  }
}
