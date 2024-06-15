import {
  IsEmail,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  BeforeUpdate,
  Column,
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

  @Column({
    type: 'double',
    default: 0,
  })
  @Min(0)
  @Max(5)
  avarageStars: number;

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

  calculateAvarageStars(starsOnTop?: number) {
    if (
      this.receivedReviews &&
      (this.receivedReviews.length > 0 || starsOnTop > 0 || starsOnTop < 0)
    ) {
      let totalStars = this.receivedReviews.reduce(
        (total, next) => total + next.stars,
        0,
      );
      if (starsOnTop > 0) {
        totalStars += starsOnTop;
        return totalStars / (this.receivedReviews.length + 1);
      }
      if (starsOnTop < 0) {
        totalStars += starsOnTop;
        if (totalStars === 0) {
          return 0;
        }
        return totalStars / (this.receivedReviews.length - 1);
      }
      return totalStars / this.receivedReviews.length;
    }
  }
}
