import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat';
import { Repository, In } from 'typeorm';
import { Message } from '../message/message';
import { User } from '../user/user';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(User) private userRepo: Repository<User>,
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

  async createChat(ownerId: string, memberIds: string[]): Promise<Chat> {
    const owner = await this.userRepo.findOne({
      where: { id: ownerId },
      relations: { friends: true },
    });
    const members = await this.userRepo.find({ where: { id: In(memberIds) } });
    members.forEach(member => {
      if (!owner.friends.some(friend => friend.id === member.id)) {
        throw new HttpException(
          `${member.id} is not a friend of the owner`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });
    if (memberIds.length !== members.length) {
      throw new HttpException(
        `Some members were not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const chat = new Chat();
    chat.members = [...members, owner];
    chat.name = 'Chat';
    return await this.chatRepo.save(chat);
  }
}
