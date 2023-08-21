import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';
import * as sha256 from 'sha256';
import { Settings } from './settings';
import { Chat } from 'src/chat/chat';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
  ) {}

  async getUser(
    id: string,
    friends?: boolean,
    chats?: boolean,
    settings?: boolean,
  ): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: { chats, friends, settings },
    });
    return user;
  }

  async createUser(user: User): Promise<User> {
    const [dataAlreadyExist, msg] = await this.isDataAlreadyUsed(user);
    if (dataAlreadyExist) {
      throw new HttpException(msg, HttpStatus.BAD_REQUEST);
    }
    delete user.id;
    user.password = sha256.x2(user.password);
    user.username = user.username.toLocaleLowerCase();
    user.settings = new Settings();
    const globalchat = await this.chatRepo.findOne({ where: { id: 'global' } });
    user.chats = [globalchat];
    user = await this.userRepo.save(user);
    delete user.password;
    return user;
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { id } });
  }

  async findOneByUsernameWithPassword(
    username: string,
  ): Promise<User | undefined> {
    return this.userRepo.findOne({
      where: { username },
      select: { password: true, username: true, id: true },
    });
  }

  async isDataAlreadyUsed(user: User): Promise<[boolean, string]> {
    const userWithSameUsername = await this.userRepo.findOne({
      where: { username: user.username },
    });
    if (userWithSameUsername) return [true, 'Username already exists'];

    const userWithSameEmail = await this.userRepo.findOne({
      where: { email: user.email },
    });
    if (userWithSameEmail) return [true, 'Email already exists'];
    return [false, ''];
  }

  async addFriend(user1Id: string, user2Id: string) {
    const user1 = await this.userRepo.findOne({
      where: { id: user1Id },
      relations: ['friends'],
    });
    const user2 = await this.userRepo.findOne({
      where: { id: user2Id },
      relations: ['friends'],
    });
    if (!user1?.friends) {
      user1.friends = [];
    }
    if (!user1?.friends.find(friend => friend.id == user2.id)) {
      user1.friends.push(user2);
    }
    return this.userRepo.save(user1);
  }

  async changeSettings(id: string, settings: Settings): Promise<User> {
    let user = await this.getUser(id, false, false, true);
    const keys = Object.keys(settings);
    const datas = keys.map(async key => {
      user = await this.changeSetting(user, key, settings[key]);
    });
    const allPromise = Promise.allSettled(datas);
    const statuses = await allPromise;
    if (statuses.some(status => status.status === 'rejected')) {
      throw statuses.find(status => status.status === 'rejected')['reason'];
    }
    return user;
  }

  /**
   * @param user User or UserID
   */
  async changeSetting(
    user: string | User,
    key: string,
    value: any,
  ): Promise<User> {
    user =
      typeof user === 'string'
        ? await this.getUser(user, false, false, true)
        : user;
    if (key === 'id') {
      throw new HttpException(
        `Id change is not allowed`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (typeof user.settings[key] !== typeof value) {
      throw new HttpException(
        `Datatype of '${key}' value is not the same as needed. Is: '${typeof value}' Has to be: '${typeof user
          .settings[key]}'`,
        HttpStatus.BAD_REQUEST,
      );
    }
    user.settings[key] = value;
    return await this.userRepo.save(user);
  }
}
