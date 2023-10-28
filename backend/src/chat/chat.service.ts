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
      relations: { members, admins: members },
    });
  }

  async getChatMessages(id: string): Promise<Message[]> {
    const chat = await this.chatRepo.findOne({ where: { id } });
    if (!chat) throw new HttpException('No chat found', HttpStatus.BAD_REQUEST);
    const messages = await this.messageRepo.find({
      where: {
        chat: {
          id: chat.id,
        },
      },
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

  async createChat(ownerId: string, memberids: string[]): Promise<Chat> {
    if (typeof memberids === 'string') {
      throw new HttpException(
        `memberids must be an array of strings`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const owner = await this.userRepo.findOne({
      where: { id: ownerId },
      relations: { friends: true },
    });
    const members = await this.userRepo.find({ where: { id: In(memberids) } });
    members.forEach(member => {
      if (!owner.friends.some(friend => friend.id === member.id)) {
        throw new HttpException(
          `${member.id} is not a friend of the owner`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });
    if (memberids.length !== members.length) {
      throw new HttpException(
        `Some members were not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const chat = new Chat();
    chat.members = [...members, owner];
    chat.admins = [owner];
    chat.name = 'Chat';
    return await this.chatRepo.save(chat);
  }

  async updateChat(id: string, newChat: Chat, editor: User): Promise<Chat> {
    if (newChat.id)
      throw new HttpException('Cannot change chat id', HttpStatus.BAD_REQUEST);
    let chat = await this.chatRepo.findOne({
      where: { id },
      relations: { admins: true, members: true },
    });
    if (!chat)
      throw new HttpException('Could not find chat', HttpStatus.BAD_REQUEST);
    if (!chat.admins.find(user => user.id === editor.id))
      throw new HttpException('You are not an admin', HttpStatus.BAD_REQUEST);
    chat = { ...chat, ...newChat };
    return this.chatRepo.save(chat);
  }
}
