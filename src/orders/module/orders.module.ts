import { Module } from '@nestjs/common';
import { OrdersService } from '../service/orders.service';
import { OrdersController } from '../controller/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderProducts } from '../entities/order-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderProducts]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
