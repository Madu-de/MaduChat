import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message';
import { Chat } from '../chat/chat';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private userService: UserService,
  ) {}

  async getMessage(
    id: string,
    requester: User,
    author?: boolean,
    chat?: boolean,
  ): Promise<Message> {
    const message = await this.messageRepo.findOne({
      where: { id },
      relations: { author, chat },
    });
    if (author) {
      message.author = await this.userService.getPrivacyUser(
        message.author,
        requester,
      );
    }
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
      relations: { members: true, admins: true },
    });
    if (!author) {
      throw new HttpException('Author does not exist', HttpStatus.BAD_REQUEST);
    }
    if (!chat) {
      throw new HttpException('Chat does not exist', HttpStatus.BAD_REQUEST);
    }
    const isAdmin = chat.admins.some(admin => admin.id === author.id);
    const isMember = chat.members.some(member => member.id === author.id);
    const canWriteAMessage =
      isAdmin ||
      (!chat.isAdminChat && chat.isPublic) ||
      (isMember && !chat.isAdminChat);
    if (!canWriteAMessage) {
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
