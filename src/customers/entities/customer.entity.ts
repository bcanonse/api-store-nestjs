import { Order } from '../../orders/entities/order.entity';
import { DateAt } from '../../database/entities/date.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('increment', {
    comment: 'Primary key table',
    primaryKeyConstraintName: 'pk_customers_id',
  })
  public id: number;

  @Column('varchar', {
    length: 255,
    nullable: false,
    comment: 'Name of customer',
  })
  public name: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
    comment: 'Last name of customer',
  })
  public lastName: string;

  @Column('varchar', {
    length: 255,
    nullable: true,
    comment: 'Phone of customer',
  })
  public phone: string;

  @OneToOne(() => User, (user) => user.customer, {
    nullable: true,
  })
  public user: User;

  @Column(() => DateAt)
  public register: DateAt;

  @OneToMany(() => Order, (order) => order.customer)
  public orders: Order[];
}
