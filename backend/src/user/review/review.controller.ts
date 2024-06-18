import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './review';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  getReview(@Param('id') id: string, @Req() request: Request): Promise<Review> {
    return this.reviewService.getReview(id, request['user']);
  }

  @UseGuards(AuthGuard)
  @Get('recieved/:userid')
  async getRecievedReviews(
    @Param('userid') userid: string,
    @Query('offset') offset: number,
  ) {
    return await this.reviewService.getRecievedReviews(userid, offset);
  }

  @UseGuards(AuthGuard)
  @Get('written/:userid')
  async getWrittenReviews(
    @Param('userid') userid: string,
    @Query('offset') offset: number,
  ) {
    return await this.reviewService.getWrittenReviews(userid, offset);
  }
}
