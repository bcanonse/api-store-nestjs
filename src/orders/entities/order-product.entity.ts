import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DateAt } from '../../database/entities/date.entity';
import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity('order_products')
export class OrderProducts {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_order_products_id',
    comment: 'Id of order_products table',
  })
  public id: number;

  @Column(() => DateAt)
  public register: DateAt;

  @Column('numeric', {
    precision: 10,
    scale: 2,
    nullable: false,
  })
  public quantity: number;

  @ManyToOne(() => Product)
  @JoinColumn({
    foreignKeyConstraintName: 'fk_order_products_product',
  })
  public product: Product;

  @ManyToOne(() => Order)
  @JoinColumn({
    foreignKeyConstraintName: 'fk_order_products_order',
  })
  public order: Order;
}
