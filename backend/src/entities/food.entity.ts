import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";

@Entity("food")
export class FoodEntity extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: "date", nullable: false})
  date: Date;

  @Column({ type: "varchar", nullable: false})
  food: string;

  @Column({ type: "integer", nullable: false})
  calrory: number;

  @ManyToOne(() => UserEntity, (user) => user.uuid, { nullable: false})
  @JoinColumn({ name: 'user_id' })
  userId: UserEntity;
}