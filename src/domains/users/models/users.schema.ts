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
import { Teams } from '../../teams/models/teams.schema';
import { UserStatuses } from './users.interface';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  profileImage: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar', default: '' })
  phoneNumber: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  facebook: string;

  @Column({ type: 'varchar', nullable: true })
  instagram: string;

  @Column({ type: 'varchar' })
  password?: string;

  @Column({ type: 'simple-array', select: false })
  oldPasswords: string[];

  @Column({ type: 'varchar', default: UserStatuses.INACTIVE })
  status: UserStatuses;

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