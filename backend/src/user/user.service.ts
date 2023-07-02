import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';
import * as sha256 from 'sha256';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    delete user.password;
    return user;
  }

  async createUser(user: User): Promise<User> {
    const dataAlreadyExist = await this.isDataAlreadyUsed(user);
    if (dataAlreadyExist) {
      throw new HttpException(
        'Email or Tag already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    delete user.id;
    user.password = sha256.x2(user.password);
    user.username = user.username.toLocaleLowerCase();
    user = await this.userRepo.save(user);
    delete user.password;
    return user;
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { id } });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { username } });
  }

  async isDataAlreadyUsed(user: User): Promise<boolean> {
    if (
      (await this.userRepo.find({ where: { username: user.username } }))
        .length > 0
    )
      return true;
    if ((await this.userRepo.find({ where: { email: user.email } })).length > 0)
      return true;
    return false;
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
    if (!user1?.friends.find((friend) => friend.id == user2.id)) {
      user1.friends.push(user2);
    }
    return this.userRepo.save(user1);
  }
}
