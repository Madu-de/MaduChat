import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
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
}
