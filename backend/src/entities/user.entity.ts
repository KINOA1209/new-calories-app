import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";
import { CONST } from "@/constant";

@Entity("user")
export class UserEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar", nullable: true })
  name: string;

  @Column({ type: "varchar", nullable: false })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "integer", nullable: false })
  role: number;

  @Column({ type: "integer", default: CONST.CALRORY_LIMIT })
  calrory: number;
}
