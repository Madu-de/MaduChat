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
  getRepository,
} from 'typeorm';
import { Settings } from './settings';
import { Chat } from '../chat/chat';
import { Review } from './review/review';
import { getRepositoryToken } from '@nestjs/typeorm';

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

  @Column()
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

  @BeforeUpdate()
  async calculateAvarageStars() {
    if (this.receivedReviews && this.receivedReviews.length > 0) {
      const totalStars = this.receivedReviews.reduce(
        (total, next) => total + next.stars,
        0,
      );
      this.avarageStars = totalStars / this.receivedReviews.length;
    }
  }
}
