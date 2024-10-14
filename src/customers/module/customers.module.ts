import { Module } from '@nestjs/common';
import { CustomersService } from '../service/customers.service';
import { CustomersController } from '../controller/customers.controller';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
