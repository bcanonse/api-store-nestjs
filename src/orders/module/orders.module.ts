import { Module } from '@nestjs/common';
import { OrdersService } from '../service/orders.service';
import { OrdersController } from '../controller/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { CustomersModule } from 'src/customers/module/customers.module';
import { ProfileController } from '../controller/profile.controller';
import { UsersModule } from 'src/users/module/users.module';

@Module({
  imports: [
    UsersModule,
    CustomersModule,
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrdersController, ProfileController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
