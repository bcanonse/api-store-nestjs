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
import { OrderProduct } from '../../order-products/entities/order-product.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_orders_id',
    comment: 'Id orders table',
  })
  public id: number;

  // excluímos el campo deseado cuando lo retornemos
  @Exclude()
  @Column(() => DateAt)
  public register: DateAt;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({
    foreignKeyConstraintName: 'fk_orders_customer',
  })
  public customer: Customer;

  @Exclude()
  @OneToMany(() => OrderProduct, (item) => item.order)
  public items: OrderProduct[];

  // decorador para "crear nuevos datos"
  @Expose()
  get products() {
    // tenemos items?
    if (this.items) {
      // hacemos esta transformación

      return this.items
        .filter((items) => !!items) // nos aseguramos que no sea nulo o oundefined
        .map((item) => ({
          // recorremos todos los items
          ...item.product,
          // le añadimos el campo "quantity" al producto
          quantity: item.quantity,
          // añadimos el identificador del item
          itemId: item.id,
        }));
    }

    return [];
  }

  // podemos crear un campo donde nos de el precio total de la orden
  @Expose()
  get total() {
    // tenemos items?
    if (this.items) {
      // hacemos esta transformación

      return this.items
        .filter((items) => !!items) // nos aseguramos que no sea nulo o oundefined
        .reduce((acum, item) => {
          // el precio total es igual a el precio por la cantidad
          const totalItem =
            item.product.price * item.quantity;
          // se lo sumamos al acum en cada iteración
          return acum + totalItem;
        }, 0);
    }

    return 0;
  }
}
