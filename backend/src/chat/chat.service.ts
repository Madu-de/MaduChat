import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat';
import { Repository, In } from 'typeorm';
import { Message } from '../message/message';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private userService: UserService,
    private websocketService: WebsocketService,
  ) {}

  async getChat(id: string, requester: User, members?: boolean): Promise<Chat> {
    let chat = await this.chatRepo.findOne({
      where: { id },
      relations: { members, admins: members },
    });
    if (members) {
      chat = await this.getChatWithPrivacyUser(chat, requester);
    }
    return chat;
  }

  async getChatMessages(id: string, requester: User): Promise<Message[]> {
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
    await Promise.all(
      messages.map(async (message, i) => {
        messages[i].author = await this.userService.getPrivacyUser(
          message.author,
          requester,
        );
      }),
    );
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

  async updateChat(id: string, newChat: Chat, requester: User): Promise<Chat> {
    if (newChat.id) delete newChat.id;
    let chat = await this.chatRepo.findOne({
      where: { id },
      relations: { admins: true, members: true },
    });
    requester = await this.userRepo.findOne({
      where: { id: requester.id },
      relations: { friends: true },
    });
    if (!chat)
      throw new HttpException('Could not find chat', HttpStatus.BAD_REQUEST);
    if (!chat.admins.find(user => user.id === requester.id))
      throw new HttpException('You are not an admin', HttpStatus.BAD_REQUEST);
    if (
      newChat.members &&
      !chat.admins.every(admin =>
        newChat.members.some(member => admin.id === member.id),
      )
    )
      throw new HttpException('You cannot kick admins', HttpStatus.BAD_REQUEST);
    const addedMembers = newChat.members.filter(m =>
      chat.members.every(m2 => m.id !== m2.id),
    );
    if (addedMembers.some(m => requester.friends.every(f => f.id !== m.id))) {
      throw new HttpException(
        `You can only add friends to your chat`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const removedMembers = chat.members.filter(m =>
      newChat.members.every(m2 => m.id !== m2.id),
    );
    removedMembers.forEach(member => {
      this.websocketService.forceUserLeave(chat.id, member.id);
    });
    chat = { ...chat, ...newChat };
    return await this.getChatWithPrivacyUser(
      await this.chatRepo.save(chat),
      requester,
    );
  }

  private async getChatWithPrivacyUser(chat: Chat, requester: User) {
    await Promise.all(
      chat.members.map(async (member, i) => {
        chat.members[i] = await this.userService.getPrivacyUser(
          member,
          requester,
        );
      }),
    );
    await Promise.all(
      chat.admins.map(async (admin, i) => {
        chat.admins[i] = await this.userService.getPrivacyUser(
          admin,
          requester,
        );
      }),
    );
    return chat;
  }
}
