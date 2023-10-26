import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, ValidateIf, ValidationOptions } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


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
  @IsEnum(Language)
  @IsOptional()
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
  @IsOptional()
  @Transform(({ value }) => value || OnlinePrivacy.EVERYONE)
  onlinePrivacy: OnlinePrivacy;
}
