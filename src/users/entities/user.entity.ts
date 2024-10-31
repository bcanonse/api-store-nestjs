import { DateAt } from '../../database/entities/date.entity';
import { Customer } from '../../customers/entities/customer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export enum UserRole {
  Admin = 'admin',
  Supervissor = 'supervissor',
  Basic = 'basic',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', {
    comment: 'Primary key table',
    primaryKeyConstraintName: 'pk_users_id',
  })
  public id: number;

  @Column('varchar', {
    unique: true,
    nullable: false,
    length: 255,
    comment: 'Email of user',
  })
  public email: string;

  @Column('varchar', {
    nullable: false,
    length: 255,
    comment: 'Password of user',
  })
  @Exclude()
  public password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    comment: 'Role of user',
    default: UserRole.Basic,
  })
  public role: UserRole;

  @Column(() => DateAt)
  public register: DateAt;

  @OneToOne(() => Customer, (customer) => customer.user, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    foreignKeyConstraintName: 'fk_users_customer',
  })
  public customer: Customer;
}
