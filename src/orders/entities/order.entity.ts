import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Customer } from '../../customers/entities/customer.entity';
import { DateAt } from '../../database/entities/date.entity';
import { OrderProducts } from './order-product.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_orders_id',
    comment: 'Id orders table',
  })
  public id: number;

  @Column(() => DateAt)
  public register: DateAt;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({
    foreignKeyConstraintName: 'fk_orders_customer',
  })
  public customer: Customer;

  @OneToMany(() => OrderProducts, (item) => item.order)
  public items: OrderProducts[];
}
