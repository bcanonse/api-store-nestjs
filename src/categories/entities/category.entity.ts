import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Product } from '../../products/entities/product.entity';
import { DateAt } from '../../database/entities/date.entity';

@Entity('categories')
@Unique('uq_categories_name', ['name'])
export class Category {
  @PrimaryGeneratedColumn('increment', {
    comment: 'Primary key of table',
    primaryKeyConstraintName: 'pk_categories_id',
  })
  public id: number;

  @Column('varchar', {
    length: 255,
    comment: 'Name of category',
  })
  public name: string;

  @Column(() => DateAt)
  public register: DateAt;

  @ManyToMany(
    () => Product,
    (product) => product.categories,
  )
  public products: Product[];
}
