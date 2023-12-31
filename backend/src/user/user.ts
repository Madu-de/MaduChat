import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Settings } from './settings';
import { Chat } from '../chat/chat';

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
}
