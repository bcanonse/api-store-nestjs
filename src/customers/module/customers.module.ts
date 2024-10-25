import { Module } from '@nestjs/common';
import { CustomersService } from '../service/customers.service';
import { CustomersController } from '../controller/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
