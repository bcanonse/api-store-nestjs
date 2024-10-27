import { Injectable } from '@nestjs/common';
import { CreateOrderProductDto } from '../dto/create-order-product.dto';
import { OrdersService } from 'src/orders/service/orders.service';
import { ProductsService } from 'src/products/service/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProduct } from '../entities/order-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderProductsService {
  constructor(
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
  ) {}

  async create(
    createOrderProductDto: CreateOrderProductDto,
  ) {
    const { orderId, productId, quantity } =
      createOrderProductDto;

    const order = await this.ordersService.findOne(
      orderId,
      false,
    );
    const product = await this.productsService.findOne(
      productId,
      false,
    );

    const orderProducts = new OrderProduct();

    orderProducts.order = order;
    orderProducts.product = product;
    orderProducts.quantity = quantity;

    return await this.orderProductRepository.save(
      orderProducts,
    );
  }
}
