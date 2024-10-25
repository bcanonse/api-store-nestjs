import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const newCustomer = this.customersRepository.create(
      createCustomerDto,
    );

    return await this.customersRepository.save(newCustomer);
  }

  async findAll() {
    return await this.customersRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customersRepository.findOne(
      {
        where: { id },
      },
    );

    if (!customer)
      throw new NotFoundException(
        `Customer ${id} not found`,
      );

    return customer;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ) {
    const customer = await this.findOne(id);

    this.customersRepository.merge(
      customer,
      updateCustomerDto,
    );

    return await this.customersRepository.save(customer);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.customersRepository.delete(id);
  }
}
