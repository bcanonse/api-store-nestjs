import { Module } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { ProductsController } from '../controller/products.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
