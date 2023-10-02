import { MaxLength, MinLength } from 'class-validator';
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
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @ManyToMany(() => User, {
    cascade: true,
  })
  @JoinTable({
    name: 'chatadmins',
  })
  admins: User[];

  @ManyToMany(() => User, {
    cascade: true,
  })
  @JoinTable({
    name: 'chatmembers',
  })
  members: User[];
}
