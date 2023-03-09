import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Teams } from "./Teams";
import { Users } from "./Users";

export enum PermissionStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
}

@Entity()
export class Permissions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Users, (user) => user.userId, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn({ name: "currentUserId" })
  @Column({ type: "varchar", nullable: false })
  currentUserId: string | Users;

  @Column({ type: "varchar", nullable: false })
  roleName: string;

  @Column({ type: "integer", nullable: false })
  commission: number;

  @ManyToOne(() => Users, (user) => user.userId, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn({ name: "trainerUserId" })
  @Column({ type: "varchar", nullable: true })
  trainerUserId: string;

  @Index()
  @ManyToOne(() => Teams, (team) => team.teamId, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn({ name: "teamId" })
  @Column({ type: "varchar", nullable: true })
  teamId: string;

  @Column({
    type: "varchar",
    nullable: false,
    default: PermissionStatus.PENDING,
  })
  status: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @BeforeUpdate()
  public setUpdateDate(): void {
    this.updatedAt = new Date();
  }
}
