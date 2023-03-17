import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Teams } from './Teams';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  userId: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', default: '' })
  profileImage: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar', default: '' })
  phoneNumber: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', default: '' })
  facebook: string;

  @Column({ type: 'varchar', default: '' })
  instagram: string;

  @Column({ type: 'varchar' })
  password?: string;

  @Column({ type: 'simple-array', select: false })
  oldPasswords: string[];

  @Column({ type: 'varchar', nullable: false, default: UserStatus.INACTIVE })
  status: UserStatus;

  @Index()
  @ManyToOne(() => Teams, (team) => team.teamId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'teamId' })
  @Column({ type: 'varchar', nullable: true })
  teamId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @BeforeUpdate()
  public setUpdateDate(): void {
    this.updatedAt = new Date();
  }
}
