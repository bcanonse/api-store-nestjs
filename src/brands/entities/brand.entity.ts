import { DateAt } from '../../database/entities/date.entity';
import { Product } from '../../products/entities/product.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('brands')
@Unique('uq_brands_name', ['name'])
export class Brand {
  @PrimaryGeneratedColumn('increment', {
    comment: 'Primary key of brands',
    primaryKeyConstraintName: 'pk_brands_id',
  })
  public id: number;

  @Column('varchar', { length: 230 })
  public name: string;

  @Column('varchar', { length: 255 })
  public image: string;

  @Column(() => DateAt)
  public register: DateAt;

  @OneToMany(() => Product, (product) => product.brand)
  public product: Product[];
}
