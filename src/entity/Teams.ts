import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './Users';

export enum TeamStatuses {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DEACTIVE = 'DEACTIVE',
}

@Entity()
export class Teams {
  @PrimaryGeneratedColumn('uuid')
  teamId: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', default: TeamStatuses.ACTIVE })
  status: TeamStatuses;

  @ManyToOne(() => Users, (users) => users.userId, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdBy' })
  @Column({ type: 'varchar', nullable: true, select: false })
  createdBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;
}
