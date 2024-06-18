import { Injectable } from '@nestjs/common';
import { Review } from './review';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user.service';
import { User } from '../user';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
    private userService: UserService,
  ) {}

  async getReview(id: string, requester: User): Promise<Review> {
    const review = await this.reviewRepo.findOne({
      relations: { author: true, target: true },
      where: { id },
    });

    review.author = await this.userService.getUser(review.author.id, requester);

    review.target = await this.userService.getUser(review.target.id, requester);

    return review;
  }

  async getRecievedReviews(userId: string, offset: number, requester: User) {
    return await this.userService.getRecievedReviews(userId, offset, requester);
  }

  async getWrittenReviews(userId: string, offset: number, requester: User) {
    return await this.userService.getWrittenReviews(userId, offset, requester);
  }
}
