import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { ProductsService } from 'src/products/service/products.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly config: ConfigService,
  ) {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'correo@mail.com',
      password: '12345',
      role: 'admin',
    },
  ];

  create(createUserDto: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    console.log(this.config.get('API_KEY'));
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  findOrdersByUser(id: number): Order {
    const user = this.findOne(id);

    return {
      date: new Date(),
      user: user,
      products: this.productsService.findAll(),
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    const index = this.users.findIndex(
      (item) => item.id === id,
    );
    this.users[index] = {
      ...user,
      ...updateUserDto,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex(
      (item) => item.id === id,
    );
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
