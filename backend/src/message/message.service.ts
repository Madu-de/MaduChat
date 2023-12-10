import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
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
    message.author = await this.userService.getPrivacyUser(
      message.author,
      requester,
    );
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
      history: [],
    });
  }
  async editMessage(
    newMessage: string,
    messageid: string,
    authorid: string,
  ): Promise<boolean> {
    const message = await this.messageRepo.findOne({
      where: { id: messageid },
      relations: { author: true },
    });
    if (!message) {
      throw new HttpException('Message does not exist', HttpStatus.BAD_REQUEST);
    }
    if (message.author.id !== authorid) {
      throw new HttpException(
        'Author is not allowed to edit this message',
        HttpStatus.FORBIDDEN,
      );
    }
    if (message.history?.length > 0) {
      message.history.push(newMessage);
    } else {
      message.history = [newMessage];
    }
    try {
      const updateResult: UpdateResult = await this.messageRepo.update(
        { id: messageid },
        { message: newMessage, history: message.history },
      );
      if (updateResult.affected > 0) {
        return true;
      }
    } catch(err) {
      throw new HttpException(
        'Could not update message',
        HttpStatus.NOT_MODIFIED,
      );
    }
  }
}
