import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Settings } from './settings';
import { Chat } from '../chat/chat';
import { Review } from './review/review';
import { ReviewStats } from './review/reviewStats';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @MinLength(1)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @Column()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @Column()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @Column({ select: false, default: '' })
  image?: string;

  @Column({
    default: false,
  })
  isAdmin: boolean;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @Column({
    default: false,
  })
  isOnline: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => User, user => user.friendRequetsReceived)
  @JoinTable({
    name: 'friendrequests',
  })
  friendRequestsSent: User[];

  @ManyToMany(() => User, user => user.friendRequestsSent)
  friendRequetsReceived: User[];

  @ManyToMany(() => User, user => user.friends)
  @JoinTable({
    name: 'friends',
  })
  friends: User[];

  @ManyToOne(() => Settings, {
    cascade: true,
  })
  @JoinTable()
  settings: Settings;

  @ManyToMany(() => Chat, {
    cascade: true,
  })
  @JoinTable({
    name: 'chatmembers',
  })
  chats: Chat[];

  @OneToMany(() => Review, review => review.author)
  @JoinTable({
    name: 'review',
  })
  writtenReviews: Review[];

  @OneToMany(() => Review, review => review.target)
  @JoinTable({
    name: 'review',
  })
  receivedReviews: Review[];

  @ManyToOne(() => ReviewStats, {
    cascade: true,
  })
  @JoinTable({
    name: 'reviewStats',
  })
  reviewStats: ReviewStats;

  addReviewOnTarget(stars: number) {
    this.reviewStats.totalReceivedReviews++;
    this.reviewStats.totalReceivedStars += stars;
    this.reviewStats.avarageReceivedStars =
      this.reviewStats.totalReceivedStars /
      this.reviewStats.totalReceivedReviews;
    this.editStarSpredOfTarget(stars, 1);
  }

  removeReviewOfTarget(stars: number) {
    this.reviewStats.totalReceivedReviews--;
    this.reviewStats.totalReceivedStars -= stars;
    this.editStarSpredOfTarget(stars, -1);
    if (this.reviewStats.totalReceivedReviews <= 0) {
      this.reviewStats.totalReceivedReviews = 0;
      this.reviewStats.totalReceivedStars = 0;
      this.reviewStats.avarageReceivedStars = 0;
      return;
    }
    this.reviewStats.avarageReceivedStars =
      this.reviewStats.totalReceivedStars /
      this.reviewStats.totalReceivedReviews;
  }

  private editStarSpredOfTarget(stars: number, add: number) {
    this.reviewStats.totalReceived1Star += stars === 1 ? add : 0;
    this.reviewStats.totalReceived2Stars += stars === 2 ? add : 0;
    this.reviewStats.totalReceived3Stars += stars === 3 ? add : 0;
    this.reviewStats.totalReceived4Stars += stars === 4 ? add : 0;
    this.reviewStats.totalReceived5Stars += stars === 5 ? add : 0;
  }

  addReviewOnRequester(stars: number) {
    this.reviewStats.totalSentReviews++;
    this.reviewStats.totalSentStars += stars;
    this.reviewStats.avarageSentStars =
      this.reviewStats.totalSentStars / this.reviewStats.totalSentReviews;
    this.editStarSpredOfRequester(stars, 1);
  }

  removeReviewOfRequester(stars: number) {
    this.reviewStats.totalSentReviews--;
    this.reviewStats.totalSentStars -= stars;
    this.editStarSpredOfRequester(stars, -1);
    if (this.reviewStats.totalSentReviews <= 0) {
      this.reviewStats.totalSentReviews = 0;
      this.reviewStats.totalSentStars = 0;
      this.reviewStats.avarageSentStars = 0;
      return;
    }
    this.reviewStats.avarageSentStars =
      this.reviewStats.totalSentStars / this.reviewStats.totalSentReviews;
  }

  private editStarSpredOfRequester(stars: number, add: number) {
    this.reviewStats.totalSent1Star += stars === 1 ? add : 0;
    this.reviewStats.totalSent2Stars += stars === 2 ? add : 0;
    this.reviewStats.totalSent3Stars += stars === 3 ? add : 0;
    this.reviewStats.totalSent4Stars += stars === 4 ? add : 0;
    this.reviewStats.totalSent5Stars += stars === 5 ? add : 0;
  }
}
