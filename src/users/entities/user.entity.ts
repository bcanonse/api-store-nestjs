import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  public password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    comment: 'Role of user',
    default: UserRole.Basic,
  })
  public role: UserRole;
}
