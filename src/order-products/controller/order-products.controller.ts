import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrderProductsService } from '../service/order-products.service';

import { CreateOrderProductDto } from '../dto/create-order-product.dto';

@ApiTags('order-products')
@Controller('order-products')
export class OrderProductsController {
  constructor(
    private readonly orderProductsService: OrderProductsService,
  ) {}

  @Post()
  async create(
    @Body() createOrderProductDto: CreateOrderProductDto,
  ) {
    return await this.orderProductsService.create(
      createOrderProductDto,
    );
  }
}
