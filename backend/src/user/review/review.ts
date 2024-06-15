import {
  AfterRemove,
  BeforeInsert,
  BeforeRemove,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user';
import { IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinTable()
  author: User;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinTable()
  target: User;

  @Column({
    type: 'text',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  text: string;

  @Column({
    type: 'integer',
  })
  @Min(1)
  @Max(5)
  stars: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async beforeInsert() {
    this.target.avarageStars = this.target.calculateAvarageStars(this.stars);
    console.log(this.target.avarageStars);
  }
}
