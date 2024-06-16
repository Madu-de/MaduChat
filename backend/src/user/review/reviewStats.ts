import { Min, Max } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReviewStats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'double',
    default: 0,
  })
  @Min(0)
  @Max(5)
  avarageReceivedStars: number;

  @Column({
    default: 0,
  })
  totalReceivedStars: number;

  @Column({
    default: 0,
  })
  totalReceivedReviews: number;

  @Column({
    default: 0,
  })
  totalReceived1Star: number;

  @Column({
    default: 0,
  })
  totalReceived2Stars: number;

  @Column({
    default: 0,
  })
  totalReceived3Stars: number;

  @Column({
    default: 0,
  })
  totalReceived4Stars: number;

  @Column({
    default: 0,
  })
  totalReceived5Stars: number;
}
