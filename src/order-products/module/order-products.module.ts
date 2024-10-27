import { Module } from '@nestjs/common';
import { OrderProductsService } from '../service/order-products.service';
import { OrderProductsController } from '../controller/order-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from '../entities/order-product.entity';
import { OrdersModule } from 'src/orders/module/orders.module';
import { ProductsModule } from 'src/products/module/products.module';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    TypeOrmModule.forFeature([OrderProduct]),
  ],
  controllers: [OrderProductsController],
  providers: [OrderProductsService],
})
export class OrderProductsModule {}
