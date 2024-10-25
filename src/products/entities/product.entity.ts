import { Brand } from '../../brands/entities/brand.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'products',
  comment: 'Table to store products',
})
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

  @ManyToOne(() => Brand, (brand) => brand.product)
  @JoinColumn({
    foreignKeyConstraintName: 'fk_products_brand',
    name: 'brand_id',
  })
  public brand: Brand;
}
