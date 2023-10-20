import { Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum OnlinePrivacy {
  EVERYONE = 'everyone',
  FRIENDS = 'friends',
  NOONE = 'no one',
}

export enum Language {
  ENGLISH = 'English',
  DEUTSCH = 'Deutsch',
  FRANCAIS = 'Français',
  ESPANOL = 'Español',
}

@Entity()
export class Settings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.ENGLISH,
  })
  @Transform(({ value }) => value || Language.ENGLISH)
  language: Language;

  @Column('bool', {
    default: true,
  })
  showAvatar: boolean;

  @Column({
    type: 'enum',
    enum: OnlinePrivacy,
    default: OnlinePrivacy.EVERYONE,
  })
  @IsEnum(OnlinePrivacy)
  @Transform(({ value }) => value || OnlinePrivacy.EVERYONE)
  onlinePrivacy: OnlinePrivacy;

  @BeforeInsert()
  async beforeInsert() {
    if (!this.onlinePrivacy) console.log('test');
  }
}
