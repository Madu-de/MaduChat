import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  message: string;

  @Column()
  chatid: string;

  @Column()
  authorid: string;

  @CreateDateColumn()
  createdAt: Date;
}
