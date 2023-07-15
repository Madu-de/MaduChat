import { IsString } from 'class-validator';
import { User } from '../user/user';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  name: string;

  @ManyToMany(() => User, {
    cascade: true,
  })
  @JoinTable({
    name: 'chatmembers',
  })
  members: User[];
}
