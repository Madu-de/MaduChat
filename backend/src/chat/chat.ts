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
