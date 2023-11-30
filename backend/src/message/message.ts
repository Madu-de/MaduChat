import { IsString, MaxLength, MinLength } from 'class-validator';
import { Chat } from '../chat/chat';
import { User } from '../user/user';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  message: string;

  @ManyToOne(() => Chat, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  chat: Chat;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinTable()
  author: User;

  @CreateDateColumn()
  createdAt: Date;
}
