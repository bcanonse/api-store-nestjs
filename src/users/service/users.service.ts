import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserRole } from '../entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { ProductsService } from 'src/products/service/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleDto } from '../dto/role-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly productsService: ProductsService,
  ) {}

  mapToRole(role: UserRoleDto) {
    switch (role) {
      case UserRoleDto.Admin:
        return UserRole.Admin;
      case UserRoleDto.Basic:
        return UserRole.Basic;
      default:
        return UserRole.Supervissor;
    }
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const newUser = this.usersRepository.create({
      ...createUserDto,
      role: this.mapToRole(createUserDto.role),
    });

    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findOrdersByUser(
    id: number,
  ): Promise<Order | null> {
    const user = await this.findOne(id);

    return {
      date: new Date(),
      user: user,
      products: await this.productsService.findAll(),
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) return null;

    this.usersRepository.merge(user, {
      ...updateUserDto,
      role: this.mapToRole(updateUserDto.role),
    });

    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user)
      throw new NotFoundException(`User #${id} not found`);

    return this.usersRepository.delete(id);
  }
}
