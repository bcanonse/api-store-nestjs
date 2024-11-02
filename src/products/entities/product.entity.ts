import { Category } from '../../categories/entities/category.entity';
import { Brand } from '../../brands/entities/brand.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';

@Entity({
  name: 'products',
  comment: 'Table to store products',
})
// en un array enviamo los atributos que esten indexados de forma conjunta
// @Index(['price', 'stock'])
export class Product {
  // ID autoincremental generado automáticamente
  @PrimaryGeneratedColumn({
    primaryKeyConstraintName: 'pk_product_id',
    comment: 'Id product table',
  })
  id: number;

  // Definimos el tipo de dato de esta columna
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  @Index('idx_products_price')
  price: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  stock: number;

  @Column({ type: 'varchar' })
  image?: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updatedAt: Date;

  @Column('boolean', {
    default: true,
  })
  public active: boolean;

  @ManyToOne(() => Brand, (brand) => brand.product)
  @JoinColumn({
    foreignKeyConstraintName: 'fk_products_brand',
    name: 'brand_id',
  })
  public brand: Brand;

  @ManyToMany(
    () => Category,
    (category) => category.products,
  )
  @JoinTable({
    name: 'products_categories',
    // joinColumn: {
    //   name: 'product_id',
    //   referencedColumnName: 'id',
    // },
    // inverseJoinColumn: {
    //   name: 'category_id',
    //   referencedColumnName: 'id',
    // },
  })
  public categories: Category[];
}
