import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    default: 'English',
  })
  language: string;

  @Column('bool', {
    default: true,
  })
  showAvatar: boolean;
}
