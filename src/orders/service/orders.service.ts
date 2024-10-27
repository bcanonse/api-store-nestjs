import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

import { Order } from '../entities/order.entity';
import { CustomersService } from 'src/customers/service/customers.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly customersService: CustomersService,
  ) {}

  private throwNotFoundProduct(
    data: any,
    isSingular = true,
  ) {
    const singularMessage = isSingular
      ? 'product'
      : 'products';
    throw new NotFoundException(
      `The ${singularMessage} ${data} not found`,
    );
  }

  private getOptionsQuery(withRelations: boolean) {
    return withRelations
      ? {
          relations: ['items', 'items.product'],
        }
      : undefined;
  }

  async create(createOrderDto: CreateOrderDto) {
    const { customerId } = createOrderDto;
    const order = new Order();
    if (customerId) {
      const customer =
        await this.customersService.findOne(customerId);

      order.customer = customer;
    }

    return await this.ordersRepository.save(order);
  }

  async findAll() {
    return await this.ordersRepository.find();
  }

  async findOne(id: number, withRelations = true) {
    const options = this.getOptionsQuery(withRelations);
    const order = await this.ordersRepository.findOne({
      where: { id },
      ...options,
    });

    if (!order) this.throwNotFoundProduct(id);

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);

    const { customerId } = updateOrderDto;

    if (customerId) {
      const customer =
        await this.customersService.findOne(customerId);
      order.customer = customer;
    }

    return await this.ordersRepository.save(order);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.ordersRepository.delete(id);
  }
}
