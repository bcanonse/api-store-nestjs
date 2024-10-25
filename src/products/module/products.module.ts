import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from '../controller/products.controller';
import { ProductsService } from '../service/products.service';
import { Product } from '../entities/product.entity';
import { BrandsModule } from 'src/brands/module/brands.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    BrandsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
