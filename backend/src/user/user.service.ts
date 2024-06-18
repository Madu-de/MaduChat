import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './user';
import * as sha256 from 'sha256';
import { OnlinePrivacy, Settings } from './settings';
import { Chat } from '../chat/chat';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import type { Response } from 'express';
import { Review } from './review/review';
import { ReviewStats } from './review/reviewStats';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
  ) {}

  async getPrivacyUser(user: User, requester: User): Promise<User> {
    const dbuser: User = await this.userRepo.findOne({
      where: { id: user.id },
      relations: { friends: true, settings: true },
    });
    if (!user.settings) {
      user.settings = dbuser.settings;
    }
    if (!user.friends) {
      user.friends = dbuser.friends;
    }
    if (user.id === requester.id) {
      return user;
    }
    if (user.settings.onlinePrivacy === OnlinePrivacy.NOONE) {
      delete user.isOnline;
    }
    if (
      user.settings.onlinePrivacy === OnlinePrivacy.FRIENDS &&
      !user.friends.some(friend => friend.id === requester.id)
    ) {
      delete user.isOnline;
    }
    return user;
  }

  async getUser(
    id: string,
    requester: User,
    friends?: boolean,
    chats?: boolean,
    settings?: boolean,
    reviews?: boolean,
  ): Promise<User> {
    let user = await this.userRepo.findOne({
      where: { id },
      relations: {
        chats,
        friends: true,
        settings: true,
        friendRequestsSent: friends,
        friendRequetsReceived: friends,
        reviewStats: reviews,
      },
    });
    if (reviews) {
      user.receivedReviews = await this.getRecievedReviews(id, 0);
      user.writtenReviews = await this.getWrittenReviews(id, 0);
    }
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    user = await this.getPrivacyUser(user, requester);
    if (friends) {
      await Promise.all(
        user.friends.map?.(async (u, i) => {
          user.friends[i] = await this.getPrivacyUser(u, requester);
        }),
      );
      await Promise.all(
        user.friendRequestsSent.map?.(async (u, i) => {
          user.friendRequestsSent[i] = await this.getPrivacyUser(u, requester);
        }),
      );
      await Promise.all(
        user.friendRequetsReceived.map?.(async (u, i) => {
          user.friendRequetsReceived[i] = await this.getPrivacyUser(
            u,
            requester,
          );
        }),
      );
    }
    if (reviews) {
      await Promise.all(
        user.receivedReviews.map(async (review, i) => {
          user.receivedReviews[i] = await this.reviewRepo.findOne({
            where: { id: review.id },
            relations: { author: true, target: true },
          });
          user.receivedReviews[i].author = await this.getPrivacyUser(
            user.receivedReviews[i].author,
            requester,
          );
          user.receivedReviews[i].target = await this.getPrivacyUser(
            user.receivedReviews[i].target,
            requester,
          );
        }),
      );

      await Promise.all(
        user.writtenReviews.map(async (review, i) => {
          user.writtenReviews[i] = await this.reviewRepo.findOne({
            where: { id: review.id },
            relations: { author: true, target: true },
          });
          user.writtenReviews[i].author = await this.getPrivacyUser(
            user.writtenReviews[i].author,
            requester,
          );
          user.writtenReviews[i].target = await this.getPrivacyUser(
            user.writtenReviews[i].target,
            requester,
          );
        }),
      );
    }
    if (!friends) delete user.friends;
    if (!settings) delete user.settings;
    return user;
  }

  async getUserLike(
    name: string,
    request: Request,
    friends?: boolean,
    chats?: boolean,
    settings?: boolean,
  ): Promise<User[]> {
    if (!name)
      throw new HttpException(
        "Parameter 'like' is required",
        HttpStatus.BAD_REQUEST,
      );
    const users = await this.userRepo.find({
      where: [{ name: Like(`%${name}%`) }, { username: Like(`%${name}%`) }],
      relations: { chats, friends: true, settings: true },
      take: 30,
    });
    await Promise.all(
      users.map(async (user, i) => {
        users[i] = await this.getPrivacyUser(user, request['user']);
        if (!friends) delete users[i].friends;
        if (!settings) delete users[i].settings;
      }),
    );
    return users;
  }

  async createUser(user: User): Promise<User> {
    const [dataAlreadyExist, msg] = await this.isDataAlreadyUsed(user);
    if (dataAlreadyExist) {
      throw new HttpException(msg, HttpStatus.BAD_REQUEST);
    }
    delete user.id;
    user.password = sha256.x2(user.password);
    user.username = user.username.toLocaleLowerCase();
    const language = user.settings?.language;
    user.settings = new Settings();
    user.reviewStats = new ReviewStats();
    user.settings.language = language || user.settings.language;
    const globalchat = await this.chatRepo.findOne({ where: { id: 'global' } });
    user.chats = [globalchat];
    user = await this.userRepo.save(user);
    delete user.password;
    return user;
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

  async addFriendRequest(user1Id: string, user2Id: string, request: Request) {
    if (user2Id === undefined)
      throw new HttpException(`friendId is required`, HttpStatus.BAD_REQUEST);
    const user1 = await this.getUser(user1Id, request['user'], true);
    const user2 = await this.getUser(user2Id, request['user'], true);
    if (user1.friendRequestsSent.some(user => user.id === user2.id)) {
      throw new HttpException('Request already sent', HttpStatus.BAD_REQUEST);
    }
    if (user1.id === user2.id) {
      throw new HttpException(
        'You cannot send a friend request to yourself',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user1.friends.some(user => user.id === user2.id)) {
      throw new HttpException(
        'You cannot send a friend request to a friend',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user1.friendRequetsReceived.some(user => user.id === user2.id)) {
      return this.addFriend(user1, user2);
    }
    user1.friendRequestsSent.push(user2);
    await this.userRepo.save(user1);
    return await this.getPrivacyUser(user2, request['user']);
  }

  private async addFriend(user1: User, user2: User) {
    user1.friendRequetsReceived = user1.friendRequetsReceived.filter(
      user => user.id !== user2.id,
    );
    user2.friendRequestsSent = user2.friendRequestsSent.filter(
      user => user.id !== user1.id,
    );
    user1.friends.push(user2);
    await this.userRepo.save(user1);
    delete user1.friends;
    delete user1.friendRequestsSent;
    delete user1.friendRequetsReceived;
    user2.friends.push(user1);
    return await this.userRepo.save(user2);
  }

  async removeFriend(user1Id: string, user2Id: string, request: Request) {
    if (user2Id === undefined)
      throw new HttpException(`friendId is required`, HttpStatus.BAD_REQUEST);
    const user1 = await this.getUser(user1Id, request['user'], true);
    let user2 = await this.getUser(user2Id, request['user'], true);
    user1.friendRequestsSent = user1.friendRequestsSent.filter(
      user => user.id !== user2Id,
    );
    user2.friendRequetsReceived = user2.friendRequetsReceived.filter(
      user => user.id !== user1Id,
    );
    user1.friends = user1.friends.filter(user => user.id !== user2Id);
    user2.friends = user2.friends.filter(user => user.id !== user1Id);
    await this.userRepo.save(user1);
    user2 = await this.userRepo.save(user2);
    return await this.getPrivacyUser(user2, request['user']);
  }

  async changeSettings(
    id: string,
    settings: Settings,
    request: Request,
  ): Promise<User> {
    let user = await this.getUser(id, request['user'], false, false, true);
    const keys = Object.keys(settings);
    const datas = keys.map(async (key: keyof Settings) => {
      user = await this.changeSetting(
        user,
        key,
        <typeof key>settings[key],
        request,
      );
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
  private async changeSetting(
    user: string | User,
    key: keyof Settings,
    value: typeof key,
    request: Request,
  ): Promise<User> {
    user =
      typeof user === 'string'
        ? await this.getUser(user, request['user'], false, false, true)
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
    user.settings[<string>key] = value;
    return await this.userRepo.save(user);
  }

  async changeProfilePicture(
    userId: string,
    filePath: string,
    response: Response,
  ) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      select: { image: true, id: true },
    });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    user.image = filePath;
    await this.userRepo.save(user);
    return await this.getProfilePicture(userId, response);
  }

  async getProfilePicture(id: string, response: Response) {
    const user = await this.userRepo.findOne({
      where: { id },
      select: { image: true },
    });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    if (!existsSync(join(process.cwd(), user.image)) || !user.image) {
      throw new HttpException(
        'User has no profile picture',
        HttpStatus.BAD_REQUEST,
      );
    }
    const file = createReadStream(join(process.cwd(), user.image));
    file.pipe(response);
  }

  async deleteProfilePicture(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      select: { image: true, id: true },
    });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    user.image = '';
    await this.userRepo.save(user);
  }

  async getMyReviewOfTarget(targetId: string, requesterId: string) {
    const review = await this.reviewRepo.findOne({
      where: {
        target: { id: targetId },
        author: { id: requesterId },
      },
    });
    if (!review) {
      throw new HttpException('Review not found', HttpStatus.BAD_REQUEST);
    }
    return review;
  }

  async createReview(
    targetId: string,
    requesterId: string,
    reviewBody: { review: string; stars: number },
  ) {
    if (targetId === requesterId) {
      throw new HttpException(
        'User is not allowed to review himself',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (reviewBody.stars < 1 || reviewBody.stars > 5) {
      throw new HttpException(
        'Invalid review. Stars must be between 1 and 5',
        HttpStatus.BAD_REQUEST,
      );
    }
    const requester = await this.userRepo.findOne({
      where: { id: requesterId },
      relations: {
        reviewStats: true,
      },
    });
    const target = await this.userRepo.findOne({
      where: { id: targetId },
      relations: {
        receivedReviews: {
          author: true,
        },
        reviewStats: true,
      },
    });
    if (target.receivedReviews.some(r => r.author.id === requesterId)) {
      throw new HttpException(
        'User is not allowed to review this user twice',
        HttpStatus.BAD_REQUEST,
      );
    }
    target.addReviewOnTarget(reviewBody.stars);
    requester.addReviewOnRequester(reviewBody.stars);
    const newtarget = await this.userRepo.save(target);
    const newrequester = await this.userRepo.save(requester);
    const review = new Review();
    review.author = newrequester;
    review.target = newtarget;
    review.text = reviewBody.review;
    review.stars = reviewBody.stars;
    const savedReview = await this.reviewRepo.save(review);
    return savedReview;
  }

  async deleteReview(targetId: string, requesterId: string) {
    const requester = await this.userRepo.findOne({
      where: { id: requesterId },
      relations: {
        writtenReviews: {
          target: {
            receivedReviews: true,
            reviewStats: true,
          },
        },
        reviewStats: true,
      },
    });
    const review: Review = requester.writtenReviews.find(
      r => r.target.id === targetId,
    );
    if (!review) {
      throw new HttpException(
        'There is no review written by the requester',
        HttpStatus.BAD_REQUEST,
      );
    }
    review.target.removeReviewOfTarget(review.stars);
    requester.removeReviewOfRequester(review.stars);
    await this.userRepo.save(review.target);
    await this.userRepo.save(requester);
    const deletedReview = await this.reviewRepo.remove(review);
    return deletedReview;
  }

  async getWrittenReviews(authorId: string, offset: number) {
    const reviews = await this.reviewRepo.find({
      where: {
        author: {
          id: authorId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      skip: offset,
      take: 20,
      relations: {
        author: true,
        target: true,
      },
    });
    return reviews;
  }

  async getRecievedReviews(targetId: string, offset: number) {
    const reviews = await this.reviewRepo.find({
      where: {
        target: {
          id: targetId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      skip: offset,
      take: 20,
      relations: {
        author: true,
        target: true,
      },
    });
    return reviews;
  }
}
