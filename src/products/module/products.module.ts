import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandsModule } from 'src/brands/module/brands.module';
import { CategoriesModule } from 'src/categories/module/categories.module';

import { ProductsController } from '../controller/products.controller';

import { ProductsService } from '../service/products.service';

import { Product } from '../entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CategoriesModule,
    BrandsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
